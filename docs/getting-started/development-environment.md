# Environment Setup

Welcome! This guide will help you prepare your Mac to build and run iOS apps using Spezi. 

> **Tip:** Spezi is also available on the Android platform via the [SpeziKt](https://github.com/StanfordSpezi/SpeziKt) project, which will be included in this documentation in the future.


## Prerequisites

- A Mac running **macOS Sequoia 15.2** (or newer)
- **25 GB** of free disk space
- **Stable internet** connection
- **Administrator (Admin)** access to your Mac

---

## Update macOS

**Why?** Newer Xcode versions require a recent macOS release.

1. Click the Apple  menu → **About This Mac**.
2. Check the version number: it should be *15.2* or above.
3. If an update is available:
   - Click **Software Update**.
   - Click **Update Now** and follow the prompts.
   - This process takes 30–60 minutes and restarts your Mac.

> 💡 **Tip:** Save your work and plug in your Mac before updating.

---

## Install Xcode

Xcode is Apple's integrated development environment (IDE). It includes:
- A code editor with syntax highlighting
- Interface Builder to design app screens
- iOS Simulator for testing your app
- Build and debugging tools

### How to install

1. Open the **App Store**.
2. Search for **Xcode**.
3. Click **Get** or **Install** (15–20 GB download).
4. Wait for the download and installation to finish.
5. Launch Xcode (Applications folder or Spotlight `Cmd + Space` → Xcode).
6. Accept the license and install any extra components.

> ⏳ **Tip:** The first launch setup can take 10–15 minutes.

### Verify Xcode

```bash
# Check Xcode version
xcodebuild -version
```

You should see **Xcode 16.2** or newer.

---

## Install Development Tools

> **Why?** Spezi relies on helper tools to manage dependencies, simulate backends, and streamline development.

The setup script installs:

- **Homebrew** (package manager for macOS)
- **Git LFS** (Large File Storage)
- **Node.js** (JavaScript runtime)
- **Firebase CLI** (local backend emulation)
- **Java (JDK)** (required by Firebase emulator)

### Run the setup script

1. Open **Terminal** (`Cmd + Space` → Terminal).
2. Paste and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/StanfordSpezi/SpeziTemplateApplication/HEAD/Scripts/setup.sh)"
```

- The script takes **10–30 minutes**.
- You may be prompted for your Mac password (normal).
- Type **y** to confirm any prompts.

> 💡 **Tip:** You'll see lots of scrolling text — that's expected!

### Verify installations

```bash
brew --version
git lfs version
node --version
firebase --version
java -version
```

If any command reports "command not found", that tool's install needs retry.

---

## Choose Your Backend

> **What's a backend?** It's the cloud services (login, data sync) your app communicates with.

Spezi supports two modes:

### Option A: No Backend (Beginner Friendly)

- **Pros:** Fast setup, no cloud required
- **Cons:** No login or cloud data storage

Run the app with Firebase disabled (`--disableFirebase`) to focus on local features.

### Option B: Local Backend Testing

- **Pros:** Full login flow and cloud features locally
- **Cons:** Additional setup and emulator to manage

Use the Firebase Emulator Suite to simulate backend services on your Mac.

> 🚀 **Recommended:** Start with **Option A**, then try **Option B** later.

### Feature Flags

In Xcode's scheme editor (Product → Scheme → Edit Scheme → Run → Arguments), you can pass these launch arguments to control optional features:

1. `--skipOnboarding`: Skip the onboarding flow (useful for UI testing).
2. `--showOnboarding`: Always show the onboarding flow on launch.
3. `--disableFirebase`: Disable all Firebase services, including login and data upload.
4. `--useFirebaseEmulator`: Force the app to connect to the local Firebase Emulator Suite (set to true when using a simulator).

> Tip: See Apple's guide on [specify launch arguments and environment variables](https://developer.apple.com/documentation/xcode/customizing-the-build-schemes-for-a-project#Specify-launch-arguments-and-environment-variables).

---

## Verify Your Setup

Run these commands to confirm everything is installed correctly:

```bash
# Check Xcode
xcodebuild -version

# Check Homebrew
brew --version

# Check development tools
git lfs version
node --version
firebase --version
java -version
```

All commands should return version numbers. If any report "command not found", re-run the setup script or install that tool manually.

---

## Next Steps

You're ready to create your first Spezi app! Continue with the [Your First App](your-first-app.md) guide to start building.

## Optional: Connect to a Firebase Cloud Project

To link the app to your own Firebase project (development or production), add your `GoogleService-Info.plist` file in base64 form to your GitHub Actions secrets (`GOOGLE_SERVICE_INFO_PLIST_BASE64`). The CI workflow (`deployment.yml`) will load it via the `googleserviceinfoplistpath` setting.

Generate a base64 string locally:
```bash
base64 -i GoogleService-Info.plist
```

> ⚠️ Do **not** commit your Firebase credentials to your repository. We recommend contributors set up their own Firebase project for testing.

---

## Troubleshooting

**Xcode won't open or crashes**
- Restart your Mac.
- Delete Xcode prefs: `rm ~/Library/Preferences/com.apple.dt.Xcode.plist`.

**Setup script errors**
- Check your internet connection.
- Run the script again or install tools manually.

**Firebase CLI not found**
```bash
npm install -g firebase-tools
```

For more help, visit the [Spezi GitHub Issues](https://github.com/StanfordSpezi/Spezi/issues).