<p align="center">
  <img src="resources/icon.png" alt="Terminix Logo" width="128" height="128">
</p>

<h1 align="center">Terminix</h1>

<p align="center">
  一款现代化、跨平台的 SSH 客户端，基于 Electron 构建
</p>

<p align="center">
  <a href="https://github.com/WangshuXC/terminix/releases"><img src="https://img.shields.io/github/v/release/WangshuXC/terminix?style=flat-square" alt="Release"></a>
  <a href="https://github.com/WangshuXC/terminix/blob/main/LICENSE"><img src="https://img.shields.io/github/license/WangshuXC/terminix?style=flat-square" alt="License"></a>
  <a href="https://github.com/WangshuXC/terminix/actions"><img src="https://img.shields.io/github/actions/workflow/status/WangshuXC/terminix/ci.yml?style=flat-square" alt="Build Status"></a>
</p>

<p align="center">
  简体中文 | <a href="./README.md">English</a>
</p>

---

## ✨ 功能特性

- **🔐 SSH 客户端** - 安全的远程连接，支持密码和私钥认证
- **📑 多标签页界面** - 管理多个会话，标签状态持久保存
- **🎨 现代化 UI** - 美观、响应式的界面，流畅的动画效果
- **🌍 跨平台** - 支持 macOS、Windows 和 Linux

## 📸 截图

<!-- 在此添加截图 -->

|             SSH 连接             |
| :------------------------------: |
| ![SSH](docs/screenshots/ssh.png) |

## 🚀 安装

### 下载

从 [Releases](https://github.com/user/terminix/releases) 页面下载适合您平台的最新版本。

| 平台    | 下载格式                       |
| ------- | ------------------------------ |
| macOS   | `.dmg`                         |
| Windows | `.exe` (NSIS 安装程序)         |
| Linux   | `.AppImage` / `.deb` / `.snap` |

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/user/terminix.git
cd terminix

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux
```

## 📖 使用指南

### 本地终端

1. 点击侧边栏的 **终端** 图标或按 `Ctrl/Cmd + T`
2. 将打开一个新的本地终端会话
3. 系统会自动检测您的默认 Shell

### SSH 连接

1. 导航到 **Hosts** 页面
2. 点击 **New Host** 配置新的 SSH 连接
3. 输入Host信息：
   - 主机名 / IP 地址
   - 端口（默认：22）
   - 用户名
   - 认证方式（密码 / 私钥）
4. 点击 **Connect** 建立连接

## 🛠️ 技术栈

| 类别       | 技术                   |
| ---------- | ---------------------- |
| 框架       | Electron 39            |
| 前端       | React 19               |
| 构建工具   | electron-vite          |
| 终端       | xterm.js 6             |
| SSH 客户端 | ssh2                   |
| 状态管理   | Jotai                  |
| 样式       | Tailwind CSS 4         |
| 动画       | Motion (Framer Motion) |
| 语言       | TypeScript 5           |

## 🏗️ 架构

```
┌─────────────────────────────────────────────────────────────┐
│                        主进程                                │
│  - 窗口管理                                                  │
│  - PTY 生命周期 (node-pty)                                   │
│  - SSH 连接 (ssh2)                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                    IPC (contextBridge)
                              │
┌─────────────────────────────────────────────────────────────┐
│                       渲染进程                               │
│  - React UI                                                 │
│  - xterm.js 终端                                            │
│  - Jotai 状态管理                                            │
└─────────────────────────────────────────────────────────────┘
```

## 🤝 贡献

欢迎贡献！请在提交 Pull Request 之前阅读我们的 [贡献指南](CONTRIBUTING.md)。

1. Fork 本仓库
2. 创建您的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Terminus](https://github.com/Eugeny/terminus) - 本项目的灵感来源
- [xterm.js](https://xtermjs.org/) - 终端模拟器组件
- [Electron](https://www.electronjs.org/) - 跨平台桌面框架

---
