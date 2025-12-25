# StoryVerse - Phygital AR Book Universe

Scan to Magic app. Physical book covers trigger a native AR video overlay locked to the cover. Scanning unlocks a digital library. Upsells show the child on new covers generated via an existing n8n workflow. Commerce runs on headless Shopify.

## Tech Stack

- **Mobile**: React Native with Expo (development builds only)
- **UI**: NativeWind for most screens, StyleSheet + Animated for AR hot path
- **AR**: @reactvision/react-viro native image tracking + video overlay
- **Backend**: NestJS + Postgres
- **AI Pipeline**: n8n workflow triggered by Nest
- **Storage**: S3 compatible or Cloudinary + CDN
- **Commerce**: Shopify Storefront API + webhooks

## Locked Baseline (from Compatibility Matrix)

| Component | Version |
|-----------|---------|
| Expo SDK | 52 |
| React Native | 0.76.9 |
| @reactvision/react-viro | 2.43.0 |
| iOS Minimum | 13.0 |
| Android Minimum | API 24 (7.0) |
| NativeWind | 4.x |

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Xcode 15+ (for iOS)
- Android Studio (for Android)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Development Builds

**Important**: ViroReact does NOT work with Expo Go. You must use development builds.

```bash
# Login to Expo
eas login

# Configure EAS (first time)
eas build:configure

# Build for iOS device
eas build --profile development --platform ios

# Build for Android device
eas build --profile development --platform android

# Run with dev client
npm start
```

### Deep Linking

Test deep links with:

```bash
# iOS Simulator
xcrun simctl openurl booted "storyverse://book/book-001"

# Android Emulator
adb shell am start -W -a android.intent.action.VIEW -d "storyverse://book/book-001"
```

## Project Structure

```
src/
├── app/                    # Expo Router routes (thin, render feature screens)
│   ├── (tabs)/             # Tab navigation screens
│   ├── ar.tsx              # AR scanner route
│   └── book/[bookId].tsx   # Deep link handler
├── features/               # Feature modules
│   ├── ar/                 # AR scanning feature
│   ├── library/            # Digital library feature
│   ├── shop/               # Commerce feature
│   └── settings/           # Settings feature
├── shared/                 # Reusable code
│   ├── components/         # UI components
│   ├── hooks/              # Common hooks
│   ├── lib/                # Utilities
│   └── theme/              # Design tokens
├── services/               # API and storage services
│   ├── api/                # Backend API clients
│   ├── storage/            # Local storage/cache
│   └── featureFlags/       # Feature toggles
├── config/                 # App configuration
└── assets/                 # AR targets, videos, fixtures
```

## AR Implementation

- **Deterministic behavior**:
  - Anchor found → Fade opacity 0→1 over 500ms
  - Anchor lost → Pause video immediately, opacity to 0
  - Fallback → If no anchor in 10s, show "Play Fullscreen"

- **Performance**:
  - ArScreen HUD uses StyleSheet + Animated (no NativeWind churn)
  - Video format: MP4 H.264, muted by default
  - Target aspect ratio: 1:1.5

## Security Rules

1. App never calls n8n directly
2. Nest signs requests to n8n and validates callback signatures
3. Rate limit and dedupe render requests

## License

Proprietary - All Rights Reserved

