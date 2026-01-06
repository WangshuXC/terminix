---
name: add-sidebar-to-app
overview: 清除 App.tsx 原有内容，使用已有的 SideBar 组件创建带侧边栏的主页布局。
todos:
  - id: clear-app-content
    content: 清除 App.tsx 中的 electron-vite 示例代码
    status: completed
  - id: import-sidebar
    content: 在 App.tsx 中导入 SideBar 组件
    status: completed
    dependencies:
      - clear-app-content
  - id: create-layout
    content: 创建带侧边栏的 Flex 主页布局结构
    status: completed
    dependencies:
      - import-sidebar
---

## 产品概述

清除 App.tsx 中原有的 electron-vite 示例内容，使用已存在的 SideBar 组件创建一个带侧边栏的主页布局。

## 核心功能

- 移除 App.tsx 中的 electron-vite 默认示例代码
- 集成已有的 SideBar 组件作为主导航
- 创建带侧边栏的主页面布局结构
- 侧边栏与主内容区域的合理布局

## 技术栈

- 前端框架：React + TypeScript（沿用现有项目技术栈）
- 图标库：@tabler/icons-react（已安装）
- 构建工具：electron-vite（现有项目配置）

## 技术架构

### 模块划分

- **布局模块**：App.tsx 作为主布局容器，负责侧边栏与内容区的整体布局
- **导航模块**：复用现有 SideBar 组件提供侧边导航功能

### 数据流

用户点击侧边栏导航项 → 触发路由/状态变化 → 主内容区域更新显示

## 实现细节

### 核心目录结构

仅展示本次修改涉及的文件：

```
src/renderer/src/
├── App.tsx                          # 修改：清除原有内容，添加侧边栏布局
└── components/ui/
    └── SideBar.tsx                  # 已存在：侧边栏组件
```

### 关键代码结构

**App 布局结构**：采用 Flex 布局，左侧为固定宽度的 SideBar，右侧为自适应的主内容区域。

```typescript
// App.tsx 布局结构
function App(): JSX.Element {
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1">
        {/* 主内容区域 */}
      </main>
    </div>
  )
}
```