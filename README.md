# 📱 React Native Calling App

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Rohittomar01/Calling-app-demo.git
cd Calling-app-demo
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Clean Android Build

```bash
cd android
./gradlew clean
cd ..
```

### Step 4: Start Metro Bundler

```bash
npm start
```

### Step 5: Run on Android

Open a new terminal and run:

```bash
npx react-native run-android
```

---

## 📦 Build APK

### Debug APK

```bash
cd android
./gradlew assembleDebug
```

APK Location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK

```bash
cd android
./gradlew assembleRelease
```

APK Location: `android/app/build/outputs/apk/release/app-release.apk`
