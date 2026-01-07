<p align="center">
  <img src="resources/icon.png" alt="Terminix Logo" width="128" height="128">
</p>

<h1 align="center">Terminix</h1>

<p align="center">
  A modern, cross-platform terminal emulator and SSH client built with Electron
</p>

<p align="center">
  <a href="https://github.com/WangshuXC/terminix/releases"><img src="https://img.shields.io/github/v/release/WangshuXC/terminix?style=flat-square" alt="Release"></a>
  <a href="https://github.com/WangshuXC/terminix/blob/main/LICENSE"><img src="https://img.shields.io/github/license/WangshuXC/terminix?style=flat-square" alt="License"></a>
  <a href="https://github.com/WangshuXC/terminix/actions"><img src="https://img.shields.io/github/actions/workflow/status/WangshuXC/terminix/ci.yml?style=flat-square" alt="Build Status"></a>
</p>

<p align="center">
  <a href="./README_CN.md">简体中文</a> | English
</p>

---

## ✨ Features

- **🖥️ Local Terminal** - Full-featured terminal emulator with native PTY support
- **🔐 SSH Client** - Secure remote connections with password and private key authentication
- **📑 Multi-Tab Interface** - Manage multiple sessions with persistent tab state
- **🎨 Modern UI** - Beautiful, responsive interface with smooth animations
- **🌍 Cross-Platform** - Works on macOS, Windows, and Linux

## 📸 Screenshots

<!-- Add your screenshots here -->

|               Local Terminal               |          SSH Connection          |
| :----------------------------------------: | :------------------------------: |
| ![Terminal](docs/screenshots/terminal.png) | ![SSH](docs/screenshots/ssh.png) |

## 🚀 Installation

### Download

Download the latest release for your platform from the [Releases](https://github.com/WangshuXC/terminix/releases) page.

| Platform | Download                       |
| -------- | ------------------------------ |
| macOS    | `.dmg`                         |
| Windows  | `.exe` (NSIS Installer)        |
| Linux    | `.AppImage` / `.deb` / `.snap` |

### Build from Source

```bash
# Clone the repository
git clone https://github.com/WangshuXC/terminix.git
cd terminix

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux
```

## 📖 Usage

### Local Terminal

1. Click the **Terminal** icon in the sidebar or press `Ctrl/Cmd + T`
2. A new local terminal session will open
3. Your default shell will be automatically detected

### SSH Connection

1. Navigate to **Hosts** page
2. Click **Add Host** to configure a new SSH connection
3. Enter host details:
   - Hostname / IP Address
   - Port (default: 22)
   - Username
   - Authentication method (Password / Private Key)
4. Click **Connect** to establish the connection

## 🛠️ Tech Stack

| Category         | Technology             |
| ---------------- | ---------------------- |
| Framework        | Electron 39            |
| Frontend         | React 19               |
| Build Tool       | electron-vite          |
| Terminal         | xterm.js 6             |
| SSH Client       | ssh2                   |
| State Management | Jotai                  |
| Styling          | Tailwind CSS 4         |
| Animation        | Motion (Framer Motion) |
| Language         | TypeScript 5           |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Main Process                           │
│  - Window management                                        │
│  - PTY lifecycle (node-pty)                                 │
│  - SSH connections (ssh2)                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                    IPC (contextBridge)
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Renderer Process                         │
│  - React UI                                                 │
│  - xterm.js terminal                                        │
│  - Jotai state management                                   │
└─────────────────────────────────────────────────────────────┘
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Terminus](https://github.com/Eugeny/terminus) - Inspiration for this project
- [xterm.js](https://xtermjs.org/) - Terminal emulator component
- [Electron](https://www.electronjs.org/) - Cross-platform desktop framework

---
