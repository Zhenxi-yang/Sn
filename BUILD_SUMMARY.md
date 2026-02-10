# 示例插件构建说明 Example Plugin Build Guide

## 问题 Problem

用action给我构建一个示例插件

Use GitHub Actions to build an example plugin

## 解决方案 Solution

已成功创建一个完整的 Supernote 示例插件项目，包含 GitHub Actions 自动构建工作流。

Successfully created a complete Supernote example plugin project with GitHub Actions automated build workflow.

## 创建的内容 What Was Created

### 1. GitHub Actions 工作流 Workflow

**文件路径 File:** `.github/workflows/build-example-plugin.yml`

**功能 Features:**
- ✅ 自动构建 Android APK
- ✅ 打包为 `.snpk` 格式
- ✅ 上传构建产物到 Artifacts
- ✅ 生成发布说明

**触发条件 Triggers:**
- Push 到 main/master 分支
- Pull Request
- 手动触发 (workflow_dispatch)

### 2. 示例插件 Example Plugin

**目录 Directory:** `example-plugin/`

**核心文件 Core Files:**

| 文件 File | 描述 Description |
|----------|------------------|
| `App.tsx` | React Native 主界面组件 |
| `index.js` | 插件入口，注册按钮 |
| `PluginConfig.json` | 插件配置文件 |
| `package.json` | Node.js 依赖配置 |
| `buildPlugin.sh` | Linux/macOS 构建脚本 |
| `android/` | Android 项目配置 |

**插件功能 Plugin Features:**
- 侧边栏按钮 (Side Button)
- 套索工具 (Lasso Tool) 
- 选择工具 (Selection Tool)
- 响应式 UI，支持深色/浅色模式
- 交互式点击计数器

### 3. 文档 Documentation

| 文件 File | 用途 Purpose |
|----------|-------------|
| `EXAMPLE_PLUGIN_GUIDE.md` | 完整使用指南 |
| `example-plugin/README.md` | 插件具体说明 |
| `BUILD_SUMMARY.md` | 本文件 - 构建总结 |

## 如何使用 How to Use

### 方式一：使用 GitHub Actions（推荐）Method 1: Using GitHub Actions (Recommended)

1. **触发构建 Trigger Build**
   ```bash
   # 推送代码触发
   git push origin main
   
   # 或在 GitHub 网页手动触发
   # Actions → Build Example Supernote Plugin → Run workflow
   ```

2. **下载产物 Download Artifacts**
   - 进入仓库 Actions 标签页
   - 选择最新的工作流运行
   - 下载 `supernote-example-plugin` artifact
   - 解压得到 `.snpk` 文件

3. **安装到设备 Install on Device**
   - 将 `.snpk` 传输到 Supernote 设备
   - 使用插件管理器安装
   - 重启应用

### 方式二：本地构建 Method 2: Local Build

```bash
cd example-plugin

# 安装依赖
npm install

# 构建插件
chmod +x buildPlugin.sh
./buildPlugin.sh

# 查看产物
ls plugin-output/
```

## 技术架构 Technical Architecture

```
┌─────────────────────────────────────┐
│    GitHub Actions Workflow          │
│  (build-example-plugin.yml)         │
└────────────┬────────────────────────┘
             │
             ├─► Setup Environment
             │   ├─ Node.js 18
             │   └─ Java 17
             │
             ├─► Install Dependencies
             │   └─ npm install
             │
             ├─► Build Android APK
             │   └─ ./buildPlugin.sh
             │       ├─ gradlew assembleRelease
             │       └─ Create APK
             │
             ├─► Package Plugin
             │   └─ Create .snpk
             │       ├─ plugin.apk
             │       └─ PluginConfig.json
             │
             └─► Upload Artifacts
                 └─ .snpk file
```

## 构建产物 Build Artifacts

构建成功后会生成：

After successful build:

```
plugin-output/
├── com.example.supernote.demo-1.0.0.snpk  # 安装包
├── plugin.apk                              # Android APK
└── PluginConfig.json                       # 配置文件
```

## 自定义插件 Customize the Plugin

### 修改插件 ID 和名称 Modify Plugin ID and Name

编辑 `example-plugin/PluginConfig.json`:

```json
{
  "id": "com.yourcompany.pluginname",
  "name": "Your Plugin Name",
  "version": "1.0.0"
}
```

### 修改界面 Modify UI

编辑 `example-plugin/App.tsx`:

```tsx
function App(): React.JSX.Element {
  // 你的自定义界面代码
  // Your custom UI code
}
```

### 添加功能按钮 Add Feature Buttons

编辑 `example-plugin/index.js`:

```javascript
PluginManager.registerButton(buttonType, scenes, {
  id: uniqueId,
  name: 'Button Name',
  icon: iconUri,
  // ... other options
});
```

## 工作流配置 Workflow Configuration

### 修改触发分支 Modify Trigger Branches

编辑 `.github/workflows/build-example-plugin.yml`:

```yaml
on:
  push:
    branches: [ your-branch-name ]
```

### 修改 Node.js 版本 Modify Node.js Version

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # 或其他版本
```

### 添加更多构建步骤 Add More Build Steps

```yaml
- name: Run Tests
  working-directory: ./example-plugin
  run: npm test

- name: Lint Code
  working-directory: ./example-plugin
  run: npm run lint
```

## 故障排除 Troubleshooting

### 问题 1: 构建失败 Build Fails

**检查项 Checklist:**
- ✅ Node.js 版本是否 >= 18
- ✅ Java 版本是否 = 17
- ✅ package.json 依赖是否正确
- ✅ Android Gradle 配置是否正确

**解决方法 Solution:**
查看 Actions 日志获取详细错误信息。

### 问题 2: 找不到 APK Not Found APK

**原因 Cause:** 
Gradle 构建失败

**解决方法 Solution:**
```bash
# 本地测试构建
cd example-plugin/android
./gradlew assembleRelease --stacktrace
```

### 问题 3: 插件无法安装 Plugin Won't Install

**检查项 Checklist:**
- ✅ `.snpk` 文件是否完整
- ✅ `PluginConfig.json` 格式是否正确
- ✅ 设备是否支持该插件版本

## 后续优化建议 Future Improvements

1. **添加测试 Add Tests**
   - 单元测试 (Jest)
   - UI 测试 (React Native Testing Library)

2. **添加代码检查 Add Linting**
   - ESLint
   - Prettier
   - TypeScript 类型检查

3. **添加版本管理 Add Version Management**
   - 自动版本号递增
   - Git 标签发布
   - Changelog 生成

4. **添加多平台支持 Add Multi-platform Support**
   - iOS 构建（如果 Supernote 支持）
   - 不同设备适配

5. **添加自动发布 Add Auto-release**
   - GitHub Releases
   - 版本说明自动生成
   - 构建产物自动附加

## 参考资源 References

- **DEVELOPMENT.md** - 详细开发文档
- **EXAMPLE_PLUGIN_GUIDE.md** - 完整使用指南  
- **example-plugin/README.md** - 插件说明
- [React Native 文档](https://reactnative.dev/)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Gradle 文档](https://docs.gradle.org/)

## 总结 Summary

✅ **已完成 Completed:**
- GitHub Actions 工作流配置
- 完整的 Supernote 插件示例
- Android 项目结构和配置
- 自动构建和打包流程
- 详细的文档和使用说明

🎉 **现在可以：Now you can:**
1. 推送代码自动构建插件
2. 从 Actions 下载 `.snpk` 文件
3. 安装到 Supernote 设备使用
4. 基于示例开发自己的插件

---

**创建日期 Created:** 2026-02-10  
**版本 Version:** 1.0.0  
**许可证 License:** MIT
