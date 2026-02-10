/**
 * Example Supernote Plugin
 * @format
 */

import {AppRegistry, Image} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { PluginManager } from 'sn-plugin-lib';

// Register the main App component
AppRegistry.registerComponent(appName, () => App);

// Initialize the plugin manager
PluginManager.init();

// Register a side button (显示在侧边栏的按钮)
PluginManager.registerButton(1, ['NOTE', 'DOC'], {
  id: 100,
  name: 'Example Plugin',
  icon: Image.resolveAssetSource(
    require('./assets/icon.png'),
  ).uri,
  showType: 1,
});

// Register a lasso button (套索选择工具按钮)
PluginManager.registerButton(2, ['NOTE', 'DOC'], {
  id: 200,
  name: 'Lasso Tool',
  icon: Image.resolveAssetSource(
    require('./assets/icon.png'),
  ).uri,
  editDataTypes: [0, 1, 2, 3, 4], // 支持所有数据类型
  showType: 1,
});

// Register a selection button (选择工具按钮)
PluginManager.registerButton(3, ['NOTE', 'DOC'], {
  id: 300,
  name: 'Selection Tool',
  icon: Image.resolveAssetSource(
    require('./assets/icon.png'),
  ).uri,
  showType: 1,
});
