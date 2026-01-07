# Contributing to Terminix

Thank you for your interest in contributing to Terminix! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/terminix.git
   cd terminix
   ```
3. **Add upstream** remote:
   ```bash
   git remote add upstream https://github.com/user/terminix.git
   ```

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm 9+
- Git

### Installation

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
src/
├── main/                 # Main process (Electron)
│   ├── index.ts          # Window management, IPC handlers
│   ├── ptyManager.ts     # Local PTY management
│   └── sshManager.ts     # SSH connection management
├── preload/              # Preload scripts
│   └── index.ts          # Context bridge API
├── renderer/src/         # Renderer process (React)
│   ├── App.tsx           # Main application
│   ├── store/            # Jotai state management
│   ├── modules/          # Feature modules
│   ├── components/       # Reusable components
│   └── hooks/            # Custom React hooks
└── shared/               # Shared code
    └── types.ts          # TypeScript types, IPC channels
```

## Making Changes

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following our code style guidelines

3. **Test your changes** locally:
   ```bash
   npm run dev
   npm run lint
   npm run typecheck
   ```

4. **Commit your changes** following our commit guidelines

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(ssh): add keyboard-interactive authentication support
fix(terminal): resolve cursor blinking issue on Windows
docs: update installation instructions
```

## Pull Request Process

1. **Update your fork** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub

4. **Fill out the PR template** completely

5. **Wait for review** - maintainers will review your PR and may request changes

6. **Address feedback** if any changes are requested

7. **Merge** - once approved, your PR will be merged

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types for all function parameters and return values
- Avoid `any` type when possible

### React

- Use functional components with hooks
- Keep components small and focused
- Use Jotai for state management

### Formatting

- Use Prettier for code formatting
- Run `npm run format` before committing
- ESLint rules are enforced

### File Naming

- React components: `PascalCase.tsx`
- Utilities/hooks: `camelCase.ts`
- Types: `types.ts` or `*.types.ts`

---

Thank you for contributing to Terminix! 🎉
