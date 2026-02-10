# Sn

## @supernote-plugin/sn-plugin-template 代码提取与分析

本仓库包含从 npm 提取的 `@supernote-plugin/sn-plugin-template` 包的完整代码和详细分析报告。

### 📦 内容

- **extracted-package/**: 完整的 npm 包代码（v1.0.12）
- **REPORT.md**: 详细的中文分析报告（336 行）

### ⚠️ 重要安全提示

该包包含**已知安全漏洞**：
- **漏洞**: `@react-native-community/cli@18.0.0` 存在命令注入漏洞
- **风险**: 任意操作系统命令执行
- **解决方案**: 升级到 18.0.1 或更高版本

**使用前请务必阅读 [REPORT.md](REPORT.md) 中的安全建议章节！**

### 📖 开发文档

详细的开发文档请查看 **[DEVELOPMENT.md](DEVELOPMENT.md)**，包含：
- `sn-plugin-lib` 完整 API 参考（`PluginManager.init`、`registerButton`、`closePluginView`）
- 按钮类型详解（侧边按钮、套索按钮、选择按钮）
- 场景类型说明（NOTE、DOC）
- `PluginConfig.json` 配置参考
- 构建流程与打包说明
- 开发示例与常见问题

### 📚 报告内容概览

1. 包基本信息与版本历史
2. 技术栈分析（React Native 0.79.2, TypeScript 5.0.4）
3. 完整项目结构
4. 核心代码分析（App.tsx, index.js, 构建脚本）
5. Android/iOS 原生平台支持
6. 使用方式与开发流程
7. **安全建议与漏洞修复指南**
8. 适用场景与最佳实践

### 🔍 快速了解

这是一个为 **Supernote 电子笔记设备** 开发插件的 React Native 模板，提供：
- 完整的跨平台项目脚手架
- Supernote 专有的插件 API (sn-plugin-lib)
- 自动化构建脚本（Linux/macOS/Windows）
- 按钮注册和视图管理功能

详细信息请查看 **[完整分析报告](REPORT.md)**。