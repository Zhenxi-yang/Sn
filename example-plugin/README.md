# Example Supernote Plugin

这是一个使用 GitHub Actions 自动构建的 Supernote 示例插件。

This is an example Supernote plugin built automatically using GitHub Actions.

## 功能特性 Features

- ✅ 侧边栏按钮 (Side Button) - 在侧边栏显示插件入口
- ✅ 套索工具 (Lasso Tool) - 支持套索选择功能
- ✅ 选择工具 (Selection Tool) - 支持文本和对象选择
- ✅ 响应式界面 (Responsive UI) - 适配不同屏幕尺寸
- ✅ 深色模式 (Dark Mode) - 自动适应系统主题
- ✅ 交互式示例 (Interactive Demo) - 包含点击计数器等交互功能

## 构建方式 Build Method

本插件使用 GitHub Actions 自动构建，工作流配置文件位于：`.github/workflows/build-example-plugin.yml`

This plugin is automatically built using GitHub Actions. The workflow configuration is at: `.github/workflows/build-example-plugin.yml`

### 自动构建触发条件 Automatic Build Triggers

- 推送到 main/master 分支 (Push to main/master branch)
- Pull Request 到 main/master 分支
- 手动触发 (Manual workflow dispatch)

### 构建产物 Build Artifacts

构建完成后，会生成以下产物：

After build completion, the following artifacts are generated:

- `*.snpk` - Supernote 插件安装包
- `release-notes.md` - 构建信息和版本详情

## 本地开发 Local Development

### 环境要求 Requirements

- Node.js >= 18
- Android SDK
- Java 17
- npm or yarn

### 安装依赖 Install Dependencies

```bash
npm install
```

### 本地构建 Local Build

```bash
# Linux/macOS
chmod +x buildPlugin.sh
./buildPlugin.sh

# Windows
.\buildPlugin.ps1
```

构建产物将输出到 `plugin-output/` 目录。

Build output will be in the `plugin-output/` directory.

## 安装到设备 Install on Device

1. 从 GitHub Actions 的 Artifacts 中下载 `.snpk` 文件
2. 将文件传输到 Supernote 设备
3. 在设备的插件管理器中安装
4. 重启应用或设备以加载插件

Steps:

1. Download the `.snpk` file from GitHub Actions Artifacts
2. Transfer the file to your Supernote device
3. Install through the device's plugin manager
4. Restart the app or device to load the plugin

## 插件结构 Plugin Structure

```
example-plugin/
├── App.tsx                  # 主界面组件 Main UI component
├── index.js                 # 插件入口 Plugin entry point
├── PluginConfig.json        # 插件配置 Plugin configuration
├── package.json             # 依赖配置 Dependencies
├── buildPlugin.sh           # 构建脚本 Build script
├── assets/
│   └── icon.png            # 插件图标 Plugin icon
└── android/                # Android 项目配置
    ├── build.gradle
    ├── app/
    │   ├── build.gradle
    │   └── src/main/
    │       ├── AndroidManifest.xml
    │       └── java/com/exampleplugin/
    │           ├── MainActivity.kt
    │           └── MainApplication.kt
    └── ...
```

## API 使用示例 API Usage Examples

### 注册按钮 Register Buttons

```javascript
import { PluginManager } from 'sn-plugin-lib';

// 初始化插件管理器
PluginManager.init();

// 注册侧边栏按钮
PluginManager.registerButton(1, ['NOTE', 'DOC'], {
  id: 100,
  name: 'Example Plugin',
  icon: iconUri,
  showType: 1,
});

// 注册套索工具按钮
PluginManager.registerButton(2, ['NOTE', 'DOC'], {
  id: 200,
  name: 'Lasso Tool',
  icon: iconUri,
  editDataTypes: [0, 1, 2, 3, 4],
  showType: 1,
});
```

### 关闭插件视图 Close Plugin View

```javascript
import { PluginManager } from 'sn-plugin-lib';

const handleClose = () => {
  PluginManager.closePluginView();
};
```

## 自定义开发 Custom Development

基于此示例，你可以：

Based on this example, you can:

1. 修改 `App.tsx` 来自定义界面 - Modify `App.tsx` to customize the UI
2. 在 `index.js` 中注册更多按钮 - Register more buttons in `index.js`
3. 更新 `PluginConfig.json` 配置插件信息 - Update `PluginConfig.json` for plugin info
4. 添加更多 React Native 组件和功能 - Add more React Native components and features

## 参考文档 References

- [DEVELOPMENT.md](../DEVELOPMENT.md) - 完整开发文档
- [sn-plugin-lib API](https://github.com/supernote) - 插件 API 文档
- [React Native 文档](https://reactnative.dev/) - React Native Documentation

## 许可证 License

MIT License

---

**注意 Note:** 这是一个示例插件，仅用于演示目的。在生产环境使用前，请根据实际需求进行修改和测试。

This is an example plugin for demonstration purposes only. Please modify and test according to your actual needs before production use.
