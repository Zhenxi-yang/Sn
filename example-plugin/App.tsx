/**
 * Example Supernote Plugin
 * Demonstrates a simple plugin UI with multiple features
 * 
 * @format
 */

import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { PluginManager } from 'sn-plugin-lib';

/**
 * Main Plugin View Component
 * Shows example features and interaction buttons
 */
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [clickCount, setClickCount] = useState(0);

  const handleClose = () => {
    PluginManager.closePluginView();
  };

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1);
  };

  const backgroundColor = isDarkMode ? '#1a1a1a' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const secondaryTextColor = isDarkMode ? '#cccccc' : '#666666';
  const buttonBgColor = isDarkMode ? '#333333' : '#f0f0f0';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Pressable style={styles.closeButton} onPress={handleClose}>
        <Text style={[styles.closeText, { color: textColor }]}>✕</Text>
      </Pressable>
      
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            🎉 示例插件
          </Text>
          <Text style={[styles.subtitle, { color: secondaryTextColor }]}>
            Example Supernote Plugin
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, { color: textColor }]}>
            功能特性 Features
          </Text>
          <Text style={[styles.infoText, { color: secondaryTextColor }]}>
            • 侧边栏按钮 (Side Button){'\n'}
            • 套索工具 (Lasso Tool){'\n'}
            • 选择工具 (Selection Tool){'\n'}
            • 响应式界面 (Responsive UI){'\n'}
            • 深色模式支持 (Dark Mode)
          </Text>
        </View>

        <Pressable 
          style={[styles.actionButton, { backgroundColor: buttonBgColor }]}
          onPress={handleButtonClick}
        >
          <Text style={[styles.actionButtonText, { color: textColor }]}>
            点击测试 Click Test
          </Text>
        </Pressable>

        <View style={styles.counterBox}>
          <Text style={[styles.counterLabel, { color: secondaryTextColor }]}>
            点击次数 Click Count:
          </Text>
          <Text style={[styles.counterValue, { color: textColor }]}>
            {clickCount}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: secondaryTextColor }]}>
            Built with GitHub Actions 🚀
          </Text>
          <Text style={[styles.footerText, { color: secondaryTextColor }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  closeText: {
    fontSize: 20,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  infoBox: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 24,
  },
  actionButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 24,
    minWidth: 200,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  counterLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  counterValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    marginVertical: 4,
  },
});

export default App;
