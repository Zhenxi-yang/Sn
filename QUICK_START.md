# 快速开始 Quick Start

## 🎯 目标 Goal

使用 GitHub Actions 自动构建 Supernote 插件示例。

Use GitHub Actions to automatically build a Supernote plugin example.

## ✅ 已创建内容 What's Been Created

### 1️⃣ GitHub Actions 工作流
📁 `.github/workflows/build-example-plugin.yml`

- 自动构建 Android APK
- 打包为 `.snpk` 格式
- 上传到 Artifacts

### 2️⃣ 示例插件
📁 `example-plugin/`

完整的 React Native Supernote 插件，包含：
- 三种按钮类型（侧边栏、套索、选择）
- 响应式 UI
- 深色/浅色模式支持
- 交互式功能演示

### 3️⃣ 文档
- 📄 `BUILD_SUMMARY.md` - 详细构建说明
- 📄 `EXAMPLE_PLUGIN_GUIDE.md` - 完整使用指南
- 📄 `example-plugin/README.md` - 插件说明

## 🚀 立即使用 Get Started Now

### 方法 1: 使用 GitHub Actions（推荐）

1. **手动触发构建**
   - 访问: `https://github.com/Zhenxi-yang/Sn/actions`
   - 选择 "Build Example Supernote Plugin"
   - 点击 "Run workflow" → "Run workflow"

2. **下载构建产物**
   - 等待构建完成（约 5-10 分钟）
   - 点击完成的工作流
   - 下载 `supernote-example-plugin` artifact
   - 解压得到 `.snpk` 文件

3. **安装到设备**
   - 传输到 Supernote 设备
   - 使用插件管理器安装
   - 重启应用使用

### 方法 2: 本地构建

```bash
# 进入插件目录
cd example-plugin

# 安装依赖
npm install

# 构建（需要 Android SDK）
chmod +x buildPlugin.sh
./buildPlugin.sh

# 查看产物
ls plugin-output/*.snpk
```

## 📋 系统要求 Requirements

### GitHub Actions（云端构建）
✅ 无需本地环境，完全在云端运行

### 本地构建
- Node.js >= 18
- Java 17
- Android SDK
- Gradle

## 📚 详细文档 Detailed Documentation

| 文档 | 内容 |
|-----|-----|
| [BUILD_SUMMARY.md](BUILD_SUMMARY.md) | 完整构建说明和故障排除 |
| [EXAMPLE_PLUGIN_GUIDE.md](EXAMPLE_PLUGIN_GUIDE.md) | 项目结构和使用指南 |
| [example-plugin/README.md](example-plugin/README.md) | 插件功能和 API 说明 |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Supernote 插件开发参考 |

## 🎨 插件功能预览 Plugin Features

示例插件包含：

✨ **三种按钮类型**
- 侧边栏按钮 - 主插件入口
- 套索工具 - 支持套索选择
- 选择工具 - 支持内容选择

🌓 **界面特性**
- 响应式设计
- 深色/浅色模式自动适配
- 流畅的动画和交互

🔧 **示例功能**
- 点击计数器
- 关闭按钮
- 滚动视图
- 中英文双语界面

## 🔄 工作流触发方式 Workflow Triggers

自动触发：
- ✅ Push 到 main/master 分支
- ✅ Pull Request

手动触发：
- ✅ GitHub Actions 页面手动运行

## 📦 构建产物 Build Output

```
supernote-example-plugin/
└── com.example.supernote.demo-1.0.0.snpk
```

可直接安装到 Supernote 设备的插件包。

## 🛠️ 自定义开发 Customize

想要开发自己的插件？

1. **Fork 此仓库**
2. **修改插件代码**
   - `example-plugin/App.tsx` - 界面
   - `example-plugin/index.js` - 按钮注册
   - `example-plugin/PluginConfig.json` - 插件信息
3. **推送到 GitHub**
4. **Actions 自动构建**
5. **下载并安装**

## ❓ 常见问题 FAQ

**Q: 构建需要多长时间？**  
A: 通常 5-10 分钟

**Q: 如何查看构建日志？**  
A: Actions → 选择工作流运行 → 查看步骤日志

**Q: 构建失败怎么办？**  
A: 查看 [BUILD_SUMMARY.md](BUILD_SUMMARY.md) 的故障排除部分

**Q: 可以在 Windows 本地构建吗？**  
A: 可以，但推荐使用 GitHub Actions（无需配置环境）

## 🎉 完成！

现在你有了：
- ✅ 一个可工作的示例插件
- ✅ 自动化的构建流程
- ✅ 详细的文档和指南
- ✅ 可以直接使用的 `.snpk` 文件（通过 Actions 构建）

开始你的 Supernote 插件开发之旅吧！🚀

---

**快速链接 Quick Links:**
- [GitHub Actions](https://github.com/Zhenxi-yang/Sn/actions)
- [详细文档](BUILD_SUMMARY.md)
- [插件说明](example-plugin/README.md)
