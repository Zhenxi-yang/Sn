# Supernote 插件开发文档

> 基于 `@supernote-plugin/sn-plugin-template` v1.0.12 的完整开发指南

---

## 目录

- [一、概述](#一概述)
- [二、环境准备](#二环境准备)
- [三、快速开始](#三快速开始)
- [四、项目结构](#四项目结构)
- [五、sn-plugin-lib API 参考](#五sn-plugin-lib-api-参考)
  - [5.1 PluginManager.init()](#51-pluginmanagerinit)
  - [5.2 PluginManager.registerButton()](#52-pluginmanagerregisterbutton)
  - [5.3 PluginManager.closePluginView()](#53-pluginmanagerclosepluginview)
- [六、按钮类型详解](#六按钮类型详解)
  - [6.1 侧边按钮（Side Button, type=1）](#61-侧边按钮side-button-type1)
  - [6.2 套索按钮（Lasso Button, type=2）](#62-套索按钮lasso-button-type2)
  - [6.3 选择按钮（Selection Button, type=3）](#63-选择按钮selection-button-type3)
- [七、场景类型](#七场景类型)
- [八、PluginConfig.json 配置](#八pluginconfigjson-配置)
- [九、构建与打包](#九构建与打包)
  - [9.1 构建前提条件](#91-构建前提条件)
  - [9.2 构建命令](#92-构建命令)
  - [9.3 构建流程详解](#93-构建流程详解)
  - [9.4 构建产物](#94-构建产物)
- [十、开发配置文件](#十开发配置文件)
- [十一、开发示例](#十一开发示例)
- [十二、常见问题](#十二常见问题)

---

## 一、概述

`@supernote-plugin/sn-plugin-template` 是一个基于 React Native 的 Supernote 电子笔记设备插件开发模板。它提供了完整的开发脚手架，包含跨平台项目结构、Supernote 专有的插件 API（`sn-plugin-lib`）以及自动化构建脚本。

**技术栈：**

| 技术 | 版本 |
|------|------|
| React Native | 0.79.2 |
| React | 19.0.0 |
| TypeScript | 5.0.4 |
| sn-plugin-lib | ^0.1.19 |
| Node.js | >=18 |

---

## 二、环境准备

### 2.1 必须安装

- **Node.js** >= 18
- **npm** 或 **yarn**
- **React Native CLI**
- **Android SDK**（用于 Android 平台开发）
- **jq** 或 **python3**（用于构建脚本解析 JSON）
- **zip**（用于打包插件）

### 2.2 可选工具

- **Xcode**（仅 iOS 平台开发需要）
- **CocoaPods**（仅 iOS 平台开发需要）
- **Gradle**（如果项目中没有 `gradlew`）

### 2.3 安装模板

```bash
npx @react-native-community/cli init MyPlugin --template @supernote-plugin/sn-plugin-template
```

或手动提取：

```bash
npm pack @supernote-plugin/sn-plugin-template
tar -xzf supernote-plugin-sn-plugin-template-1.0.12.tgz
cd package/template
npm install
```

---

## 三、快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动 Metro 开发服务器
npm start

# 3. 在 Android 设备/模拟器上运行
npm run android

# 4. 构建插件包
./buildPlugin.sh        # Linux/macOS
.\buildPlugin.ps1       # Windows
```

### 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run android` | 在 Android 设备/模拟器上运行 |
| `npm run ios` | 在 iOS 设备/模拟器上运行 |
| `npm start` | 启动 Metro 开发服务器 |
| `npm run lint` | 运行 ESLint 代码检查 |
| `npm test` | 运行 Jest 单元测试 |

---

## 四、项目结构

```
template/
├── index.js                # 应用入口文件（插件注册与按钮配置）
├── App.tsx                 # 主应用组件（插件视图 UI）
├── app.json                # 应用名称配置
├── package.json            # 项目依赖与脚本配置
├── assets/
│   └── icon.png            # 插件按钮图标
├── android/                # Android 原生代码（Kotlin + Gradle）
│   ├── app/
│   │   └── src/main/java/  # Kotlin 源码 (MainActivity, MainApplication)
│   ├── build.gradle        # Gradle 构建配置
│   └── gradle/             # Gradle Wrapper
├── ios/                    # iOS 原生代码（Swift + Xcode）
│   ├── HelloWorld/         # Swift 源码 (AppDelegate)
│   ├── HelloWorld.xcodeproj/
│   └── Podfile             # CocoaPods 依赖
├── buildPlugin.sh          # Linux/macOS 构建脚本
├── buildPlugin.ps1         # Windows 构建脚本
├── tsconfig.json           # TypeScript 配置
├── babel.config.js         # Babel 转译配置
├── metro.config.js         # Metro 打包器配置
├── jest.config.js          # Jest 测试配置
├── _eslintrc.js            # ESLint 代码规范配置
└── Gemfile                 # Ruby 依赖（iOS CocoaPods）
```

---

## 五、sn-plugin-lib API 参考

`sn-plugin-lib` 是 Supernote 插件开发的核心库，通过 `PluginManager` 对象提供所有插件管理功能。

```typescript
import { PluginManager } from 'sn-plugin-lib';
```

### 5.1 PluginManager.init()

初始化插件管理器。**必须在应用启动时调用，且在调用其他 API 之前调用。**

```typescript
PluginManager.init(): void
```

**使用示例：**

```javascript
import { PluginManager } from 'sn-plugin-lib';

// 在应用入口处初始化
PluginManager.init();
```

**注意事项：**
- 必须在 `AppRegistry.registerComponent()` 之后调用
- 每个插件生命周期中只需调用一次
- 初始化完成后才能使用 `registerButton` 等其他 API

---

### 5.2 PluginManager.registerButton()

向 Supernote 系统注册一个插件按钮。用户可以在 Supernote 界面中看到并点击该按钮来触发插件功能。

```typescript
PluginManager.registerButton(
  type: number,
  scenes: string[],
  config: ButtonConfig
): void
```

**参数说明：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | `number` | ✅ | 按钮类型（1=侧边按钮, 2=套索按钮, 3=选择按钮） |
| `scenes` | `string[]` | ✅ | 按钮可用场景列表（`'NOTE'`, `'DOC'`） |
| `config` | `ButtonConfig` | ✅ | 按钮配置对象 |

**ButtonConfig 对象：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `number` | ✅ | 按钮唯一标识符（建议使用整百数，如 100, 200, 300） |
| `name` | `string` | ✅ | 按钮显示名称 |
| `icon` | `string` | ✅ | 按钮图标 URI（通过 `Image.resolveAssetSource()` 获取） |
| `showType` | `number` | ✅ | 显示类型（1=标准显示） |
| `editDataTypes` | `number[]` | ❌ | 可编辑数据类型数组（仅套索按钮 type=2 使用） |

**editDataTypes 数据类型枚举：**

| 值 | 说明 |
|----|------|
| `0` | 笔画（Strokes） |
| `1` | 文本（Text） |
| `2` | 图片（Images） |
| `3` | 数据类型 3 |
| `4` | 数据类型 4 |

**使用示例：**

```javascript
import { Image } from 'react-native';
import { PluginManager } from 'sn-plugin-lib';

// 获取图标 URI
const iconUri = Image.resolveAssetSource(require('./assets/icon.png')).uri;

// 注册侧边按钮
PluginManager.registerButton(1, ['NOTE', 'DOC'], {
  id: 100,
  name: 'My Side Button',
  icon: iconUri,
  showType: 1,
});

// 注册套索按钮（支持编辑笔画、文本和图片）
PluginManager.registerButton(2, ['NOTE'], {
  id: 200,
  name: 'My Lasso Button',
  icon: iconUri,
  editDataTypes: [0, 1, 2],
  showType: 1,
});
```

---

### 5.3 PluginManager.closePluginView()

关闭当前的插件视图。通常在用户点击关闭按钮时调用。

```typescript
PluginManager.closePluginView(): void
```

**使用示例：**

```tsx
import React from 'react';
import { Pressable, Text } from 'react-native';
import { PluginManager } from 'sn-plugin-lib';

function CloseButton() {
  return (
    <Pressable onPress={() => PluginManager.closePluginView()}>
      <Text>✕</Text>
    </Pressable>
  );
}
```

---

## 六、按钮类型详解

### 6.1 侧边按钮（Side Button, type=1）

在 Supernote 侧边栏中显示的按钮。点击后会打开插件视图。

```javascript
PluginManager.registerButton(1, ['NOTE', 'DOC'], {
  id: 100,
  name: 'Side Button',
  icon: Image.resolveAssetSource(require('./assets/icon.png')).uri,
  showType: 1,
});
```

**特性：**
- 出现在侧边工具栏中
- 适合提供常驻功能入口
- 支持 NOTE 和 DOC 场景

### 6.2 套索按钮（Lasso Button, type=2）

与套索选择工具结合的按钮。用户用套索选中内容后，可以通过此按钮对选中内容进行操作。

```javascript
PluginManager.registerButton(2, ['NOTE', 'DOC'], {
  id: 200,
  name: 'Lasso Button',
  icon: Image.resolveAssetSource(require('./assets/icon.png')).uri,
  editDataTypes: [0, 1, 2, 3, 4],
  showType: 1,
});
```

**特性：**
- 与套索选择工具关联
- 需要配置 `editDataTypes` 指定可编辑的数据类型
- 适合对选中内容进行处理的功能

**editDataTypes 配置说明：**
- `[0]`：仅处理笔画
- `[0, 1]`：处理笔画和文本
- `[0, 1, 2, 3, 4]`：处理所有类型数据

### 6.3 选择按钮（Selection Button, type=3）

用于内容选择操作的按钮。

```javascript
PluginManager.registerButton(3, ['NOTE', 'DOC'], {
  id: 300,
  name: 'Selection Button',
  icon: Image.resolveAssetSource(require('./assets/icon.png')).uri,
  showType: 1,
});
```

**特性：**
- 提供选择操作入口
- 适合实现内容选择和操作的功能

---

## 七、场景类型

插件按钮可以注册到以下场景中：

| 场景 | 值 | 说明 |
|------|------|------|
| 笔记场景 | `'NOTE'` | 在 Supernote 笔记应用中显示 |
| 文档场景 | `'DOC'` | 在 Supernote 文档阅读器中显示 |

**场景配置示例：**

```javascript
// 仅在笔记场景中显示
PluginManager.registerButton(1, ['NOTE'], { ... });

// 仅在文档场景中显示
PluginManager.registerButton(1, ['DOC'], { ... });

// 在笔记和文档场景中均显示
PluginManager.registerButton(1, ['NOTE', 'DOC'], { ... });
```

---

## 八、PluginConfig.json 配置

`PluginConfig.json` 是插件的元数据配置文件。构建脚本会自动生成此文件（如果项目根目录不存在该文件），也可以手动创建以自定义配置。

### 配置字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 插件名称（从 `package.json` 的 `name` 字段读取） |
| `desc` | `string` | 插件描述（从 `package.json` 的 `description` 字段读取） |
| `iconPath` | `string` | 插件图标路径（构建后自动更新为相对路径） |
| `versionName` | `string` | 版本名称（从 `package.json` 的 `version` 字段读取） |
| `versionCode` | `string` | 版本号 |
| `pluginID` | `string` | 插件唯一标识符（自动生成的 16 位随机字符串） |
| `pluginKey` | `string` | 插件键名（与 `name` 相同） |
| `jsMainPath` | `string` | JavaScript 入口路径（默认 `"index"`） |
| `reactPackages` | `string[]` | ReactPackage 实现类列表（构建时自动填充） |
| `nativeCodePackage` | `string` | 原生代码包路径（如有原生代码，指向 `app.npk`） |

### 自动生成示例

```json
{
  "name": "HelloWorld",
  "desc": "",
  "iconPath": "/icon.png",
  "versionName": "0.0.1",
  "versionCode": "1",
  "pluginID": "a1b2c3d4e5f6g7h8",
  "pluginKey": "HelloWorld",
  "jsMainPath": "index",
  "reactPackages": [],
  "nativeCodePackage": "/app.npk"
}
```

### 自定义配置

如果项目根目录存在 `PluginConfig.json`，构建脚本会跳过自动生成步骤，直接使用该文件。可以手动创建来自定义 `pluginID`、`iconPath` 等字段：

```json
{
  "name": "MyPlugin",
  "desc": "My custom Supernote plugin",
  "iconPath": "assets/my-icon.png",
  "versionName": "1.0.0",
  "versionCode": "1",
  "pluginID": "my-custom-plugin-id",
  "pluginKey": "MyPlugin",
  "jsMainPath": "index"
}
```

---

## 九、构建与打包

### 9.1 构建前提条件

| 工具 | 必要性 | 说明 |
|------|--------|------|
| `bash` / `PowerShell` | ✅ 必须 | 运行构建脚本 |
| `jq` 或 `python3` | ✅ 必须 | 解析和操作 JSON 文件 |
| `zip` | ✅ 必须 | 打包插件文件 |
| `npx` | ✅ 必须 | 运行 React Native CLI |
| `gradle` / `gradlew` | ⬜ 可选 | 仅有原生 Android 代码时需要 |

### 9.2 构建命令

**Linux / macOS：**

```bash
# 在项目根目录下运行
./buildPlugin.sh

# 或指定项目路径
./buildPlugin.sh /path/to/project
```

**Windows：**

```powershell
# 在项目根目录下运行
.\buildPlugin.ps1
```

### 9.3 构建流程详解

构建脚本按以下步骤执行：

```
1. 检测操作系统
    ↓
2. 读取 package.json（名称、版本、描述）
    ↓
3. 创建 build/generated 目录
    ↓
4. 生成 React Native Bundle
   运行: npx react-native bundle --entry-file index.js
         --bundle-output build/generated/{name}.bundle
         --platform android --assets-dest build/generated
         --dev false
    ↓
5. 处理 PluginConfig.json
   - 如果项目根目录存在 → 复制到 build/generated
   - 如果不存在 → 自动生成（随机 pluginID）
    ↓
6. 复制图标文件（如果 PluginConfig.json 中配置了 iconPath）
    ↓
7. 扫描原生代码
   - 扫描项目中的 ReactPackage 实现类
   - 扫描 node_modules 中的原生模块
   - 解析 autolinking PackageList.java
    ↓
8. 构建原生 APK（如果检测到原生代码）
   运行: gradlew buildCustomApkDebug
   将 APK 复制为 build/generated/app.npk
    ↓
9. 打包为 ZIP
   将 build/generated 目录打包为 build/outputs/{name}.zip
    ↓
10. 重命名为 .snplg
    复制为 build/outputs/{name}.snplg
```

### 9.4 构建产物

构建完成后，产物位于以下目录：

```
build/
├── generated/                    # 中间文件
│   ├── PluginConfig.json         # 插件配置
│   ├── {name}.bundle             # React Native JS Bundle
│   ├── assets/                   # 静态资源
│   ├── icon.png                  # 插件图标（如果配置了）
│   └── app.npk                   # 原生代码包（如果有原生代码）
└── outputs/                      # 最终产物
    ├── {name}.zip                # ZIP 压缩包
    └── {name}.snplg              # Supernote 插件包 ← 最终部署文件
```

**`.snplg` 文件**是最终的插件包，可以安装到 Supernote 设备上。

---

## 十、开发配置文件

### 10.1 tsconfig.json

继承 React Native 的 TypeScript 配置：

```json
{
  "extends": "@react-native/typescript-config/tsconfig.json"
}
```

### 10.2 babel.config.js

使用 React Native 的 Babel 预设：

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
};
```

### 10.3 metro.config.js

使用 React Native 默认的 Metro 配置：

```javascript
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

### 10.4 jest.config.js

使用 React Native 的 Jest 预设：

```javascript
module.exports = {
  preset: 'react-native',
};
```

### 10.5 _eslintrc.js

使用 React Native 的 ESLint 配置：

```javascript
module.exports = {
  root: true,
  extends: '@react-native',
};
```

### 10.6 app.json

应用名称配置（用于 React Native 注册组件）：

```json
{
  "name": "HelloWorld",
  "displayName": "HelloWorld"
}
```

---

## 十一、开发示例

### 11.1 完整的入口文件示例（index.js）

```javascript
import { AppRegistry, Image } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PluginManager } from 'sn-plugin-lib';

// 1. 注册 React Native 应用组件
AppRegistry.registerComponent(appName, () => App);

// 2. 初始化插件管理器
PluginManager.init();

// 3. 获取图标 URI
const iconUri = Image.resolveAssetSource(
  require('./assets/icon.png')
).uri;

// 4. 注册侧边按钮 — 在笔记和文档场景都可用
PluginManager.registerButton(1, ['NOTE', 'DOC'], {
  id: 100,
  name: 'Side Button',
  icon: iconUri,
  showType: 1,
});

// 5. 注册套索按钮 — 支持处理所有数据类型
PluginManager.registerButton(2, ['NOTE', 'DOC'], {
  id: 200,
  name: 'Lasso Button',
  icon: iconUri,
  editDataTypes: [0, 1, 2, 3, 4],
  showType: 1,
});

// 6. 注册选择按钮
PluginManager.registerButton(3, ['NOTE', 'DOC'], {
  id: 300,
  name: 'Selection Button',
  icon: iconUri,
  showType: 1,
});
```

### 11.2 完整的插件视图组件示例（App.tsx）

```tsx
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
} from 'react-native';
import { PluginManager } from 'sn-plugin-lib';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const handleClose = () => {
    PluginManager.closePluginView();
  };

  return (
    <View style={styles.container}>
      {/* 关闭按钮 */}
      <Pressable style={styles.closeButton} onPress={handleClose}>
        <Text style={[styles.closeText, {
          color: isDarkMode ? '#ffffff' : '#000000'
        }]}>
          ✕
        </Text>
      </Pressable>

      {/* 状态栏适配 */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000000' : '#ffffff'}
      />

      {/* 主内容 */}
      <Text style={[styles.helloText, {
        color: isDarkMode ? '#ffffff' : '#000000'
      }]}>
        Hello World
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  helloText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
```

### 11.3 仅注册笔记场景按钮

```javascript
// 只在笔记场景中注册一个侧边按钮
PluginManager.registerButton(1, ['NOTE'], {
  id: 100,
  name: 'Note Tool',
  icon: iconUri,
  showType: 1,
});
```

### 11.4 注册仅处理笔画的套索按钮

```javascript
// 套索按钮只处理笔画数据
PluginManager.registerButton(2, ['NOTE'], {
  id: 200,
  name: 'Stroke Editor',
  icon: iconUri,
  editDataTypes: [0],  // 仅笔画
  showType: 1,
});
```

---

## 十二、常见问题

### Q1: 构建时提示 "jq or python3 required"

**A:** 构建脚本需要 `jq` 或 `python3` 来解析 JSON 文件。安装其中一个即可：

```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq

# 或者安装 python3
sudo apt-get install python3
```

### Q2: 构建后如何安装到 Supernote 设备？

**A:** 构建完成后，将 `build/outputs/{name}.snplg` 文件传输到 Supernote 设备上安装。

### Q3: 如何自定义插件 ID？

**A:** 在项目根目录创建 `PluginConfig.json` 文件，设置 `pluginID` 字段。构建脚本检测到该文件存在后会直接使用，而不会自动生成新的 ID。

### Q4: 如何为按钮设置自定义图标？

**A:** 将图标文件放在 `assets/` 目录下，然后通过 `Image.resolveAssetSource()` 获取 URI：

```javascript
const iconUri = Image.resolveAssetSource(
  require('./assets/my-custom-icon.png')
).uri;
```

### Q5: 构建脚本中 "Build conditions not met; skipping native build" 是什么意思？

**A:** 这表示构建脚本未检测到项目中有自定义的 ReactPackage 实现或第三方原生模块。如果您的插件只使用 JavaScript/TypeScript 代码，这是正常行为，不会影响插件功能。

### Q6: template.config.js 的作用是什么？

**A:** 这是 React Native Community CLI 的模板配置文件，用于定义模板的占位符名称和目录路径：

```javascript
module.exports = {
  placeholderName: 'HelloWorld',      // 项目名称占位符
  titlePlaceholder: 'Hello App Display Name',  // 显示名称占位符
  templateDir: './template',          // 模板目录
};
```

使用 `npx @react-native-community/cli init` 创建项目时，CLI 会将 `HelloWorld` 替换为您的项目名称。
