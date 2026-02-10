# Supernote 示例插件 Example Plugin

## 概述 Overview

本仓库包含一个完整的 Supernote 插件示例，展示如何使用 GitHub Actions 自动构建 Supernote 插件。

This repository contains a complete Supernote plugin example, demonstrating how to automatically build Supernote plugins using GitHub Actions.

## 项目结构 Project Structure

```
Sn/
├── .github/
│   └── workflows/
│       └── build-example-plugin.yml  # GitHub Actions 工作流
├── example-plugin/                    # 示例插件目录
│   ├── App.tsx                       # React Native 主组件
│   ├── index.js                      # 插件入口点
│   ├── PluginConfig.json             # 插件配置
│   ├── package.json                  # 项目依赖
│   ├── buildPlugin.sh                # Linux/macOS 构建脚本
│   ├── android/                      # Android 项目
│   ├── assets/                       # 资源文件（图标等）
│   └── README.md                     # 插件文档
├── extracted-package/                 # 原始模板包
├── DEVELOPMENT.md                     # 开发文档
└── README.md                         # 本文件
```

## 快速开始 Quick Start

### 使用 GitHub Actions 自动构建 Build with GitHub Actions

1. **Fork 此仓库** - Fork this repository
2. **修改插件代码** - Modify the plugin code in `example-plugin/`
3. **推送更改** - Push changes to trigger the workflow
4. **下载构建产物** - Download the built `.snpk` file from Actions artifacts

工作流会自动：
- 安装依赖
- 构建 Android APK
- 打包为 `.snpk` 格式
- 上传构建产物

The workflow automatically:
- Installs dependencies
- Builds Android APK
- Packages as `.snpk` format
- Uploads build artifacts

### 本地开发 Local Development

```bash
# 1. 进入插件目录
cd example-plugin

# 2. 安装依赖
npm install

# 3. 启动开发服务器（可选）
npm start

# 4. 构建插件
chmod +x buildPlugin.sh
./buildPlugin.sh

# 5. 查看构建产物
ls -lh plugin-output/
```

## GitHub Actions 工作流 Workflow

工作流配置文件：`.github/workflows/build-example-plugin.yml`

Workflow configuration: `.github/workflows/build-example-plugin.yml`

### 触发条件 Triggers

- ✅ 推送到 main/master 分支（Push to main/master）
- ✅ Pull Request
- ✅ 手动触发（Manual dispatch）

### 构建步骤 Build Steps

1. **Checkout** - 检出代码
2. **Setup Node.js** - 安装 Node.js 18
3. **Setup Java** - 安装 Java 17
4. **Install Dependencies** - 安装 npm 依赖
5. **Build Plugin** - 执行构建脚本
6. **Upload Artifacts** - 上传 `.snpk` 文件

### 下载构建产物 Download Artifacts

1. 进入仓库的 **Actions** 标签页
2. 选择最新的工作流运行
3. 在 **Artifacts** 部分下载 `supernote-example-plugin`
4. 解压获得 `.snpk` 文件

Steps:
1. Go to the **Actions** tab in your repository
2. Select the latest workflow run
3. Download `supernote-example-plugin` from **Artifacts**
4. Extract to get the `.snpk` file

## 插件功能 Plugin Features

示例插件包含以下功能：

The example plugin includes:

### 1. 三种按钮类型 Three Button Types

- **侧边栏按钮** (Side Button) - 在侧边栏显示
- **套索工具** (Lasso Tool) - 支持套索选择
- **选择工具** (Selection Tool) - 支持内容选择

### 2. 响应式 UI Responsive UI

- 自适应屏幕尺寸
- 支持深色/浅色模式
- 流畅的交互体验

### 3. 交互功能 Interactive Features

- 点击计数器
- 关闭按钮
- 滚动视图

## 自定义插件 Customize the Plugin

### 修改插件信息 Modify Plugin Info

编辑 `example-plugin/PluginConfig.json`:

```json
{
  "id": "com.yourcompany.pluginname",
  "name": "Your Plugin Name",
  "version": "1.0.0",
  "description": "Plugin description",
  "author": "Your Name"
}
```

### 修改界面 Modify UI

编辑 `example-plugin/App.tsx` 来自定义界面组件。

Edit `example-plugin/App.tsx` to customize UI components.

### 添加更多按钮 Add More Buttons

在 `example-plugin/index.js` 中注册更多按钮：

```javascript
PluginManager.registerButton(buttonType, scenes, config);
```

### 修改构建配置 Modify Build Configuration

编辑 `.github/workflows/build-example-plugin.yml` 来自定义构建流程。

## 安装到设备 Install on Device

1. 从 GitHub Actions 下载 `.snpk` 文件
2. 通过 USB、云存储或其他方式传输到 Supernote 设备
3. 在设备上打开插件管理器
4. 选择安装插件
5. 浏览并选择 `.snpk` 文件
6. 重启应用以加载插件

Installation steps:

1. Download `.snpk` file from GitHub Actions
2. Transfer to Supernote device via USB, cloud storage, or other methods
3. Open plugin manager on device
4. Select install plugin
5. Browse and select the `.snpk` file
6. Restart app to load the plugin

## 技术栈 Tech Stack

- **React Native** 0.79.2 - 跨平台 UI 框架
- **TypeScript** 5.0.4 - 类型安全
- **sn-plugin-lib** ^0.1.19 - Supernote 插件 API
- **Gradle** 8.11.1 - Android 构建工具
- **GitHub Actions** - CI/CD 自动化

## 参考文档 References

- [DEVELOPMENT.md](./DEVELOPMENT.md) - 详细的开发文档
- [example-plugin/README.md](./example-plugin/README.md) - 插件具体说明
- [React Native 文档](https://reactnative.dev/) - React Native 官方文档
- [GitHub Actions 文档](https://docs.github.com/actions) - GitHub Actions 官方文档

## 故障排除 Troubleshooting

### 构建失败 Build Failure

1. 检查 Actions 日志查看具体错误
2. 确保 `package.json` 中的依赖版本正确
3. 验证 Android Gradle 配置

### 插件无法安装 Plugin Won't Install

1. 检查 `.snpk` 文件是否完整
2. 验证 `PluginConfig.json` 格式
3. 确认设备支持的插件版本

### 本地构建问题 Local Build Issues

1. 确保 Node.js >= 18
2. 确保 Java 17 已安装
3. 运行 `npm install` 重新安装依赖
4. 清理构建：`cd android && ./gradlew clean`

## 贡献 Contributing

欢迎提交 Issue 和 Pull Request！

Issues and Pull Requests are welcome!

## 许可证 License

MIT License

---

**注意：** 本项目仅用于教育和演示目的。在生产环境使用前，请根据实际需求进行充分的测试和安全审查。

**Note:** This project is for educational and demonstration purposes only. Please conduct thorough testing and security review before production use.
