# CODEBUDDY.md This file provides guidance to CodeBuddy when working with code in this repository.

## Commands

| Command               | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `npm install`         | Install dependencies (requires `node-pty` native module rebuild) |
| `npm run dev`         | Start development server with hot reload                         |
| `npm run build`       | Type-check and build for production                              |
| `npm run build:mac`   | Build macOS app package                                          |
| `npm run build:win`   | Build Windows app package                                        |
| `npm run build:linux` | Build Linux app package                                          |
| `npm run lint`        | Run ESLint with cache                                            |
| `npm run format`      | Format code with Prettier                                        |
| `npm run typecheck`   | Run TypeScript type checking for both node and web               |

## Architecture

This is an **Electron + React + TypeScript** terminal application using **electron-vite** for build tooling. The app provides local terminal emulation and SSH remote connection capabilities.

### Process Architecture (Electron Three-Process Model)

```
┌─────────────────────────────────────────────────────────────┐
│                      Main Process                           │
│  src/main/index.ts      - Window management, IPC handlers   │
│  src/main/ptyManager.ts - Local PTY lifecycle (node-pty)    │
│  src/main/sshManager.ts - SSH connections (ssh2)            │
└─────────────────────────────────────────────────────────────┘
                              │
                    IPC (contextBridge)
                              │
┌─────────────────────────────────────────────────────────────┐
│                     Preload Process                         │
│  src/preload/index.ts   - Exposes terminalApi & sshApi      │
│  src/preload/index.d.ts - TypeScript declarations           │
└─────────────────────────────────────────────────────────────┘
                              │
                     window.terminalApi
                     window.sshApi
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Renderer Process                         │
│  src/renderer/src/      - React application                 │
└─────────────────────────────────────────────────────────────┘
```

### IPC Communication

All IPC channels are defined in `src/shared/types.ts` via `IPC_CHANNELS` constant. Key patterns:

- **PTY channels**: `pty:create`, `pty:data`, `pty:resize`, `pty:destroy`, `pty:output`, `pty:exit`
- **SSH channels**: `ssh:connect`, `ssh:write`, `ssh:resize`, `ssh:disconnect`, `ssh:output`, `ssh:status`, `ssh:log`, `ssh:error`, `ssh:exit`

The preload script (`src/preload/index.ts`) wraps these into two APIs:

- `window.terminalApi` - Local terminal operations
- `window.sshApi` - SSH connection operations

### Renderer Architecture

**State Management**: Jotai atoms in `src/renderer/src/store/`

- `tabs.ts` - Multi-tab state (vaults/ssh/terminal tabs)
- `hosts.ts` - SSH host configurations

**Module Pattern**: Each feature is a self-contained module in `src/renderer/src/modules/`

- `entry/` - Main entry with sidebar navigation (Hosts, Logs, Settings pages)
- `terminal/` - Local terminal using xterm.js
- `ssh/` - SSH connection with status UI and xterm.js terminal

**Tab System**: App.tsx renders tabs based on type, keeping all terminal instances alive (display:none when inactive) to preserve session state.

### Key Dependencies

- **xterm.js** (`@xterm/xterm`) - Terminal emulator UI
- **node-pty** - Native PTY spawning for local terminals
- **ssh2** - SSH2 client for remote connections
- **Jotai** - Atomic state management
- **Tailwind CSS v4** - Styling via `@tailwindcss/vite` plugin
- **motion** - Animations

### Path Aliases

Configured in `electron.vite.config.ts`:

- `@` → `src/renderer/src`
- `@renderer` → `src/renderer/src`

### Native Module Notes

`node-pty` requires native compilation. After `npm install`, electron-builder runs `postinstall` to rebuild native modules for Electron's Node version. If issues occur, run `npx electron-rebuild`.
