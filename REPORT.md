# @supernote-plugin/sn-plugin-template 分析报告

## 一、包基本信息

- **包名称**: `@supernote-plugin/sn-plugin-template`
- **当前版本**: 1.0.12
- **发布时间**: 2026-02-05
- **许可证**: MIT
- **维护者**: 
  - dunn_x <422514506@qq.com>
  - supernote <developer@supernote.com>
  - dong_x <xuxiaodong@ratta.com.cn>

## 二、包描述与用途

这是一个 Supernote 插件开发模板，基于 React Native 框架。该模板用于快速启动和开发 Supernote 设备的插件应用。

### 2.1 核心功能
- 为 Supernote 设备提供插件开发脚手架
- 集成了 React Native 0.79.2 和相关依赖
- 包含完整的 Android 和 iOS 项目结构
- 提供插件构建脚本（支持 Linux/macOS 和 Windows）

## 三、技术栈

### 3.1 主要依赖
```json
{
  "react": "19.0.0",
  "react-native": "0.79.2",
  "sn-plugin-lib": "^0.1.19"
}
```

### 3.2 开发依赖
- **构建工具**: @react-native-community/cli (18.0.0)
- **语言**: TypeScript 5.0.4
- **测试框架**: Jest 29.6.3
- **代码规范**: ESLint, Prettier
- **原生平台**: 
  - Android: Gradle 构建系统，Kotlin
  - iOS: Xcode 项目，Swift

## 四、项目结构

```
@supernote-plugin/sn-plugin-template
├── package.json              # 主包配置文件
├── template.config.js        # 模板配置
├── LICENSE                   # MIT 许可证
├── README.md                 # 说明文档
└── template/                 # 模板目录（实际项目代码）
    ├── App.tsx              # 主应用组件
    ├── index.js             # 入口文件
    ├── package.json         # 项目依赖配置
    ├── app.json             # 应用配置
    ├── assets/              # 资源文件
    │   └── icon.png
    ├── android/             # Android 原生代码
    │   ├── app/
    │   ├── build.gradle
    │   └── gradle/
    ├── ios/                 # iOS 原生代码
    │   ├── HelloWorld/
    │   ├── HelloWorld.xcodeproj/
    │   └── Podfile
    ├── buildPlugin.sh       # Linux/macOS 构建脚本
    ├── buildPlugin.ps1      # Windows 构建脚本
    └── 配置文件
        ├── tsconfig.json
        ├── babel.config.js
        ├── metro.config.js
        ├── jest.config.js
        └── _eslintrc.js
```

## 五、核心代码分析

### 5.1 应用入口 (index.js)

```javascript
import {AppRegistry, Image} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PluginManager } from 'sn-plugin-lib';

// 注册应用组件
AppRegistry.registerComponent(appName, () => App);

// 初始化插件管理器
PluginManager.init();

// 注册三个按钮类型：
// 1. 侧边按钮 (Side Button)
// 2. 套索按钮 (Lasso Button) 
// 3. 选择按钮 (Selection Button)
```

入口文件展示了如何使用 `sn-plugin-lib` 库来：
- 初始化插件管理器
- 注册不同类型的按钮（支持 NOTE 和 DOC 场景）
- 配置按钮图标和显示类型

### 5.2 主应用组件 (App.tsx)

主要特点：
1. **简单的 Hello World 界面**：在屏幕中央显示 "Hello World" 文本
2. **关闭按钮**：右上角提供关闭按钮，调用 `PluginManager.closePluginView()`
3. **主题支持**：支持深色和浅色模式切换
4. **响应式布局**：使用 Flexbox 布局，居中显示内容

核心 API 使用：
```typescript
import { PluginManager } from 'sn-plugin-lib';

// 关闭插件视图
PluginManager.closePluginView();
```

### 5.3 构建脚本分析

#### buildPlugin.sh (736 行)
Linux/macOS 平台的构建脚本，主要功能：

1. **环境检测**：
   - 操作系统检测
   - 依赖工具检测 (jq/python3)

2. **包信息读取**：
   - 从 package.json 读取名称、版本、描述
   - 生成唯一的插件 ID

3. **配置文件生成**：
   - 创建 PluginConfig.json
   - 包含插件元数据（名称、版本、ID 等）

4. **依赖处理**：
   - 扫描 node_modules
   - 识别和过滤 React Native 相关模块
   - 收集 ReactPackage 类

5. **构建流程**：
   - 设置 Metro 打包配置
   - 生成 JavaScript bundle
   - 复制资源文件
   - 打包为插件格式

#### buildPlugin.ps1 (1311 行)
Windows PowerShell 版本的构建脚本，功能与 bash 版本相同，但使用 PowerShell 语法实现。

## 六、原生平台支持

### 6.1 Android
- **语言**: Kotlin
- **最低 SDK**: 根据 build.gradle 配置
- **主要类**:
  - `MainActivity.kt`: 主活动
  - `MainApplication.kt`: 应用类
- **权限**: 在 AndroidManifest.xml 中配置

### 6.2 iOS
- **语言**: Swift
- **配置**: 
  - Xcode 项目配置
  - CocoaPods 依赖管理
- **主要文件**:
  - `AppDelegate.swift`: 应用代理
  - `Info.plist`: 应用配置
  - `PrivacyInfo.xcprivacy`: 隐私配置

## 七、使用方式

### 7.1 安装
```bash
npm pack @supernote-plugin/sn-plugin-template
tar -xzf supernote-plugin-sn-plugin-template-1.0.12.tgz
```

### 7.2 开发流程
1. 修改 `App.tsx` 实现插件功能
2. 在 `index.js` 中配置插件按钮和行为
3. 使用 `npm start` 启动 Metro 开发服务器
4. 使用 `npm run android` 或 `npm run ios` 运行应用

### 7.3 构建插件
**Linux/macOS**:
```bash
./buildPlugin.sh
```

**Windows**:
```powershell
.\buildPlugin.ps1
```

## 八、关键特性

### 8.1 sn-plugin-lib 集成
这是 Supernote 插件开发的核心库，提供：
- `PluginManager`: 插件管理器
  - `init()`: 初始化
  - `registerButton()`: 注册按钮
  - `closePluginView()`: 关闭插件视图

### 8.2 按钮注册
支持三种按钮注册方式：
1. **类型 1 - 侧边按钮**: 在侧边栏显示
2. **类型 2 - 套索按钮**: 支持编辑数据类型（笔画、文本、图片等）
3. **类型 3 - 选择按钮**: 用于选择操作

### 8.3 场景支持
- `NOTE`: 笔记场景
- `DOC`: 文档场景

## 九、版本历史

- **1.0.12** (2026-02-05): 最新版本
- **1.0.11** (2026-02-03)
- **1.0.10** (2026-01-29)
- **1.0.9** (2026-01-28)
- **1.0.8** (2026-01-26)
- **1.0.7** (2026-01-23): 首次发布

从版本迭代来看，该模板在 2026 年 1 月底开始频繁更新，表明正在积极维护和改进。

## 十、文件统计

- **总文件数**: 58 个
- **打包大小**: 153.8 KB (压缩)
- **解压大小**: 274.9 KB
- **主要文件类型**:
  - JavaScript/TypeScript 源码
  - Kotlin/Swift 原生代码
  - Gradle/Xcode 配置文件
  - 图标和资源文件
  - Shell 和 PowerShell 脚本

## 十一、优势与特点

### 优势
1. ✅ **完整的项目脚手架**：包含 Android 和 iOS 双平台支持
2. ✅ **开箱即用**：提供示例代码和构建脚本
3. ✅ **现代技术栈**：使用最新的 React Native 0.79.2 和 React 19
4. ✅ **跨平台构建**：支持 Linux/macOS/Windows 三大平台
5. ✅ **TypeScript 支持**：类型安全的开发体验
6. ✅ **MIT 许可证**：开源友好

### 特点
- 专为 Supernote 设备定制
- 集成专有的 `sn-plugin-lib` 库
- 提供按钮注册和视图管理 API
- 自动化构建流程

## 十二、适用场景

该模板适合以下开发需求：
1. 为 Supernote 电子笔记设备开发插件应用
2. 需要在 NOTE 或 DOC 场景中添加自定义按钮功能
3. 使用 React Native 技术栈开发跨平台应用
4. 需要快速启动 Supernote 插件项目

## 十三、总结

`@supernote-plugin/sn-plugin-template` 是一个专业的 Supernote 插件开发模板，提供了完整的开发框架和工具链。通过集成 React Native 和专有的 sn-plugin-lib，开发者可以快速创建功能丰富的 Supernote 插件。模板包含详细的示例代码、自动化构建脚本和完整的项目结构，大大降低了插件开发的门槛。

该模板特别适合需要为 Supernote 设备扩展功能的开发者，无论是添加自定义工具按钮、实现特殊编辑功能，还是集成第三方服务，都可以基于这个模板快速开始开发。
