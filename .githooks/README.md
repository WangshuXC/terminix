# Git Hooks

本项目配置了 Git hooks 来确保代码质量。

## Pre-push Hook

在推送到 `main` 分支之前，会自动执行以下检查：

1. **ESLint 检查** - 确保代码符合 linting 规范
2. **Prettier 格式检查** - 确保代码格式一致
3. **TypeScript 类型检查** - 确保没有类型错误

### 手动运行检查

你可以在推送前手动运行所有检查：

```bash
npm run pre-push-check
```

或者分别运行各项检查：

```bash
# ESLint 检查
npm run lint

# Prettier 格式检查
npm run format:check

# 格式化代码
npm run format

# TypeScript 类型检查
npm run typecheck
```

### Hook 安装

Git hooks 已经自动安装在 `.git/hooks/pre-push`。如果需要重新安装或在其他环境中设置，请确保：

1. 复制 hook 文件到 `.git/hooks/pre-push`
2. 给予执行权限：`chmod +x .git/hooks/pre-push`

### 跳过 Hook（不推荐）

如果在紧急情况下需要跳过 hook 检查，可以使用：

```bash
git push --no-verify origin main
```

**注意：** 不建议跳过检查，这可能导致代码质量问题。
