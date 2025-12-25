# StoryVerse Compatibility Matrix

> MCP Gate A: sosumi Verification Complete
> Status: ✅ LOCKED
> Date: 2024-12-26

## 1. Expo SDK Version

```
Expo SDK 52
```

## 2. React Native Version

```
React Native 0.76.9
```

## 3. @reactvision/react-viro Version

```
@reactvision/react-viro@2.43.0
```

## 4. Minimum OS Versions

| Platform | Minimum Version |
|----------|-----------------|
| iOS      | 13.0            |
| Android  | 7.0 (API 24)    |

## 5. Exact Install Commands

```bash
# Create new Expo project with Expo SDK 52
npx create-expo-app@latest storyverse --template expo-template-blank-typescript

# Navigate to project
cd storyverse

# Install Expo Router
npx expo install expo-router expo-linking expo-constants expo-status-bar

# Install NativeWind and Tailwind CSS
npx expo install nativewind tailwindcss react-native-reanimated

# Install ViroReact for AR
npx expo install @reactvision/react-viro

# Install additional dependencies
npx expo install expo-camera expo-av expo-file-system expo-secure-store
npx expo install @react-native-async-storage/async-storage

# Install EAS CLI globally for development builds
npm install -g eas-cli

# Initialize EAS (first time only)
eas build:configure
```

## 6. Expo Config Plugin Block (app.json)

```json
{
  "expo": {
    "name": "StoryVerse",
    "slug": "storyverse",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "scheme": "storyverse",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0f0d1a"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.storyverse.app",
      "infoPlist": {
        "NSCameraUsageDescription": "StoryVerse needs camera access to scan book covers and show magical AR experiences",
        "NSMicrophoneUsageDescription": "StoryVerse needs microphone access for video recording features"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0f0d1a"
      },
      "package": "com.storyverse.app",
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO"
      ]
    },
    "plugins": [
      "expo-router",
      [
        "@reactvision/react-viro",
        {
          "ios": {
            "cameraPermission": "StoryVerse needs camera access to scan book covers and show magical AR experiences"
          },
          "android": {
            "cameraPermission": "StoryVerse needs camera access to scan book covers and show magical AR experiences"
          }
        }
      ],
      [
        "expo-camera",
        {
          "cameraPermission": "StoryVerse needs camera access to scan book covers and show magical AR experiences"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

## 7. Permission Strings

### iOS (Info.plist)

```xml
<key>NSCameraUsageDescription</key>
<string>StoryVerse needs camera access to scan book covers and show magical AR experiences</string>

<key>NSMicrophoneUsageDescription</key>
<string>StoryVerse needs microphone access for video recording features</string>
```

### Android (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-feature android:name="android.hardware.camera" android:required="true" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
```

## 8. Development Build Commands

### Prerequisites

```bash
# Login to Expo (first time)
eas login

# Configure EAS Build (first time)
eas build:configure
```

### iOS Development Build

```bash
# Build for iOS simulator (development)
eas build --profile development --platform ios

# Build for physical iOS device
eas build --profile development --platform ios --local

# Run on iOS device (after build is complete)
npx expo run:ios --device
```

### Android Development Build

```bash
# Build for Android emulator (development)
eas build --profile development --platform android

# Build for physical Android device
eas build --profile development --platform android --local

# Run on Android device (after build is complete)
npx expo run:android --device
```

### Local Development (after initial build)

```bash
# Start Metro bundler
npx expo start --dev-client

# Run on specific platform
npx expo run:ios
npx expo run:android
```

## 9. Deep Linking Configuration

### URL Scheme

```
storyverse://
```

### Supported Deep Links

| Route | Description |
|-------|-------------|
| `storyverse://book/{bookId}` | Opens AR scanner for specific book |
| `storyverse://library` | Opens user's digital library |
| `storyverse://shop` | Opens shop screen |
| `storyverse://settings` | Opens settings screen |

### Expo Router Configuration

```typescript
// src/app/_layout.tsx
import { Slot } from 'expo-router';

export default function RootLayout() {
  return <Slot />;
}
```

```typescript
// src/app/ar.tsx - handles storyverse://book/{bookId}
import { useLocalSearchParams } from 'expo-router';
import { ArScreen } from '@/features/ar';

export default function ArRoute() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  return <ArScreen bookId={bookId} />;
}
```

### Testing Deep Links

```bash
# iOS Simulator
xcrun simctl openurl booted "storyverse://book/book-001"

# Android Emulator
adb shell am start -W -a android.intent.action.VIEW -d "storyverse://book/book-001"

# Using Expo CLI
npx uri-scheme open "storyverse://book/book-001" --ios
npx uri-scheme open "storyverse://book/book-001" --android
```

---

## Locked Baseline Summary

| Component | Version | Status |
|-----------|---------|--------|
| Expo SDK | 52 | ✅ Locked |
| React Native | 0.76.9 | ✅ Locked |
| @reactvision/react-viro | 2.43.0 | ✅ Locked |
| iOS Minimum | 13.0 | ✅ Locked |
| Android Minimum | API 24 (7.0) | ✅ Locked |
| NativeWind | 4.x | ✅ Locked |

## Hard Rules Applied

1. ✅ ViroReact verified compatible with Expo SDK 52
2. ✅ Development builds only (no Expo Go for AR features)
3. ✅ Deep linking configured for `storyverse://` scheme

## Path Selected

**Path B**: Using latest ViroReact 2.43.0 which supports Expo SDK 52 and React Native 0.76.9

---

*Generated by sosumi MCP Gate A verification*

