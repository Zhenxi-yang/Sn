#!/bin/bash

# Supernote Plugin Build Script
# This script builds the plugin and packages it into .snpk format

set -e

echo "=========================================="
echo "Building Supernote Example Plugin"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if required tools are installed
check_dependencies() {
  echo -e "${YELLOW}Checking dependencies...${NC}"
  
  if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    exit 1
  fi
  
  if ! command -v zip &> /dev/null; then
    echo -e "${RED}Error: zip is not installed${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}✓ All dependencies are installed${NC}"
}

# Build Android bundle
build_android() {
  echo -e "${YELLOW}Building Android bundle...${NC}"
  
  cd android
  
  # Build the release APK
  if [ -f "./gradlew" ]; then
    chmod +x ./gradlew
    ./gradlew assembleRelease
  else
    gradle assembleRelease
  fi
  
  cd ..
  
  echo -e "${GREEN}✓ Android build completed${NC}"
}

# Package the plugin
package_plugin() {
  echo -e "${YELLOW}Packaging plugin...${NC}"
  
  # Create output directory
  mkdir -p plugin-output
  
  # Copy the APK
  APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
  if [ -f "$APK_PATH" ]; then
    cp "$APK_PATH" plugin-output/plugin.apk
    echo -e "${GREEN}✓ APK copied${NC}"
  else
    echo -e "${RED}Error: APK not found at $APK_PATH${NC}"
    exit 1
  fi
  
  # Copy PluginConfig.json
  if [ -f "PluginConfig.json" ]; then
    cp PluginConfig.json plugin-output/
    echo -e "${GREEN}✓ PluginConfig.json copied${NC}"
  else
    echo -e "${RED}Error: PluginConfig.json not found${NC}"
    exit 1
  fi
  
  # Create the .snpk package
  cd plugin-output
  
  # Read plugin info from PluginConfig.json
  if command -v jq &> /dev/null; then
    PLUGIN_ID=$(jq -r '.id' PluginConfig.json)
    PLUGIN_VERSION=$(jq -r '.version' PluginConfig.json)
  elif command -v python3 &> /dev/null; then
    PLUGIN_ID=$(python3 -c "import json; print(json.load(open('PluginConfig.json'))['id'])")
    PLUGIN_VERSION=$(python3 -c "import json; print(json.load(open('PluginConfig.json'))['version'])")
  else
    PLUGIN_ID="example-plugin"
    PLUGIN_VERSION="1.0.0"
    echo -e "${YELLOW}Warning: Could not parse PluginConfig.json, using default values${NC}"
  fi
  
  PACKAGE_NAME="${PLUGIN_ID}-${PLUGIN_VERSION}.snpk"
  
  # Create the package
  zip -q "$PACKAGE_NAME" plugin.apk PluginConfig.json
  
  cd ..
  
  echo -e "${GREEN}✓ Plugin packaged as: plugin-output/$PACKAGE_NAME${NC}"
}

# Main build process
main() {
  echo ""
  check_dependencies
  echo ""
  
  echo "Step 1/2: Building Android application"
  build_android
  echo ""
  
  echo "Step 2/2: Packaging plugin"
  package_plugin
  echo ""
  
  echo "=========================================="
  echo -e "${GREEN}Build completed successfully!${NC}"
  echo "=========================================="
  echo ""
  echo "Plugin package location:"
  echo "  $(pwd)/plugin-output/"
  echo ""
  echo "Next steps:"
  echo "  1. Transfer the .snpk file to your Supernote device"
  echo "  2. Install it through the plugin manager"
  echo "  3. Enjoy your plugin!"
  echo ""
}

main
