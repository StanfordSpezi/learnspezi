# Development Environment Setup

This comprehensive guide will help you set up your Mac for developing iOS applications with Spezi. We'll walk through each step in detail, explaining what each tool does and why you need it.

## What You'll Need

- A Mac computer running macOS Sequoia 15.2 or newer
- At least 25GB of free disk space (for Xcode and tools)
- A stable internet connection for downloading tools
- About 1-2 hours to complete the setup

!!! tip "Why Mac Only?"
    iOS apps can only be built on Mac computers using Apple's development tools. This is a requirement from Apple, not a limitation of Spezi.

## Step 1: Update Your Mac

**Why this matters**: Newer versions of Xcode require recent macOS versions. Having the latest OS ensures compatibility and access to the newest development features.

### Check Your Current Version

1. Click the Apple logo (🍎) in the top-left corner of your screen
2. Select "About This Mac"
3. Look for the macOS version number (should be Sequoia 15.2 or newer)

### If You Need to Update

1. From the same "About This Mac" window, click "Software Update"
   - Or go to **System Settings** > **General** > **Software Update**
2. Click **Update Now** if an update is available
3. Follow the on-screen instructions
4. **Important**: This process can take 30-60 minutes and will require multiple restarts

!!! warning "Before Updating"
    - Save any open work
    - Ensure your Mac is plugged into power
    - You'll need to restart several times during the update

## Step 2: Install Xcode

**What is Xcode?** Xcode is Apple's integrated development environment (IDE). Think of it as Microsoft Word, but for writing code instead of documents. It includes:

- A code editor with syntax highlighting
- Interface builder for designing app screens
- iOS Simulator for testing apps
- Debugging tools for finding and fixing problems
- Build tools that turn your code into an actual app

### Installation Process

1. **Open the App Store** on your Mac (look for the blue icon with a white "A")

2. **Search for "Xcode"** in the search bar at the top

3. **Click Get or Install** 
   - The app is free, but it's very large (15-20GB)
   - Download time varies based on your internet speed (30 minutes to 2+ hours)

4. **Wait for the download** - You can use your Mac for other things while it downloads, but avoid intensive tasks

5. **Launch Xcode after installation**:
   - Find it in your Applications folder
   - Or press `Cmd + Space` and type "Xcode"

6. **Complete the initial setup**:
   - Agree to the license agreement
   - Install additional components when prompted
   - This may take another 10-15 minutes

7. **Verify the installation**:
   - You should see "Welcome to Xcode" screen
   - Check that the version number is 16.2 or newer
   - If prompted to install additional simulators, click "Install"

!!! info "Xcode Command Line Tools"
    Xcode will automatically install command line tools, which are needed for many development tasks. If prompted separately to install these, click "Install."

### What You'll See After Installation

When Xcode opens successfully, you'll see:
- A welcome screen with recent projects
- Options to create a new project or open existing ones
- The main Xcode interface with panels for code, files, and tools

## Step 3: Install Development Tools

**Why these tools?** Modern app development relies on various helper tools that automate common tasks, manage dependencies, and provide testing environments. The Spezi team has created a setup script that installs everything you need.

### What Gets Installed

The setup script will install:

- **Homebrew**: The "missing package manager" for macOS. Think of it as an App Store for developer tools - it makes installing and updating development tools much easier.

- **Git LFS (Large File Storage)**: An extension to Git (version control) that handles large files efficiently. Many Spezi projects include images, videos, or data files that need this.

- **Node.js**: A JavaScript runtime that's needed for many modern development tools, including Firebase.

- **Firebase CLI**: Command-line tools for Firebase (Google's backend platform). This lets you test cloud features locally without needing a real cloud account.

- **Java Development Kit (JDK)**: Required by Firebase emulator tools.

### Installation Process

1. **Open Terminal**:
   - Press `Cmd + Space` to open Spotlight search
   - Type "Terminal" and press Enter
   - You'll see a black window with white text - this is your command line

2. **Run the setup script**:
   Copy and paste this entire command, then press Enter:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/StanfordSpezi/SpeziTemplateApplication/HEAD/Scripts/setup.sh)"
   ```

3. **What to expect during installation**:
   - You'll see lots of text scrolling by - this is normal!
   - The process takes 10-30 minutes depending on your internet speed
   - You may be prompted to enter your Mac password (this is normal - some tools need administrator access)
   - Some installations may ask for confirmation - type "y" and press Enter when prompted

4. **Signs the installation is working**:
   - Text like "Installing..." or "Downloading..." appears
   - Progress bars or percentages show up
   - No error messages that stop the process

!!! tip "What If You're Uncomfortable Running Scripts?"
    If you don't want to run the automated script, you can install each tool manually:
    
    1. Install Homebrew: Visit [brew.sh](https://brew.sh) and follow instructions
    2. Install Git LFS: `brew install git-lfs`
    3. Install Node.js: `brew install node`
    4. Install Firebase CLI: `npm install -g firebase-tools`
    5. Install Java: `brew install openjdk`

### Verifying the Installation

After the script completes, verify everything installed correctly:

1. **Check Homebrew**: Type `brew --version` and press Enter
   - You should see a version number like "Homebrew 4.x.x"

2. **Check Firebase**: Type `firebase --version` and press Enter  
   - You should see a version number like "firebase-tools@13.x.x"

3. **Check Node.js**: Type `node --version` and press Enter
   - You should see a version number like "v20.x.x"

If any of these commands show "command not found," the installation may have failed for that tool.

## Step 4: Choose Your Backend Setup

**What's a backend?** Most modern apps need to store data "in the cloud" and handle user accounts. The backend is the server-side infrastructure that manages this. Think of it like the invisible plumbing that makes features like user login, data sync, and cloud storage work.

Spezi apps can connect to cloud services for features like user accounts and data storage. You have two options for development:

### Option A: No Backend (Simplest)

**Best for**: Complete beginners, learning the basics, or focusing on UI design.

**What you get**:
- ✅ All local app features work (health data collection, charts, navigation)
- ✅ Fast development without network dependencies
- ✅ No setup required beyond Xcode
- ❌ No user accounts or sign-in
- ❌ No cloud data storage
- ❌ No data sync between devices

**How it works**: The app runs with a special flag (`--disableFirebase`) that turns off all cloud features. You'll skip the login screen and work with local data only.

### Option B: Local Backend Testing (More Complete)

**Best for**: Developers who want to test all features, including user accounts and data storage.

**What you get**:
- ✅ Full user registration and sign-in flow
- ✅ Cloud data storage (simulated locally)
- ✅ Realistic testing environment  
- ✅ No need for real cloud accounts or billing
- ⚠️ Requires additional setup
- ⚠️ More complex to troubleshoot

**How it works**: Firebase Emulator Suite runs fake cloud services on your Mac. Your app thinks it's talking to real Firebase servers, but everything stays local.

### Our Recommendation

- **Start with Option A** if you're new to iOS development
- **Switch to Option B** when you want to test user accounts and data features
- You can easily switch between options at any time

## Step 5: Test Your Setup

Let's verify everything is working correctly by testing with the Spezi Template Application.

### Download the Template Application

1. **Get the code**:
   - Visit [github.com/StanfordSpezi/SpeziTemplateApplication](https://github.com/StanfordSpezi/SpeziTemplateApplication)
   - Click the green **Code** button
   - Select **Download ZIP**
   - Unzip the file to your Desktop

2. **Alternative using Terminal** (if you're comfortable with Git):
   ```bash
   git clone https://github.com/StanfordSpezi/SpeziTemplateApplication.git
   cd SpeziTemplateApplication
   ```

### Test Option A: Basic Setup (No Backend)

This tests your basic development environment:

1. **Open the project**:
   - Navigate to the downloaded folder
   - Double-click `TemplateApplication.xcodeproj`
   - Xcode should launch and load the project

2. **Configure the simulator**:
   - In Xcode's top toolbar, find the device selector (probably shows "iPhone 16 Pro")
   - If it shows "Any iOS Device", click it and select an iPhone simulator
   - Recommended: "iPhone 16 Pro (18.0)" or similar

3. **Build and run**:
   - Click the **Play** button (▶️) in the top-left corner of Xcode
   - First build may take 2-5 minutes (Xcode downloads dependencies)
   - Watch the progress in the status bar at the top

4. **Success indicators**:
   - iOS Simulator opens automatically
   - You see the Spezi Template Application launch
   - The app shows a welcome screen (you may skip onboarding since Firebase is disabled)
   - No build errors in Xcode's bottom panel

### Test Option B: Full Setup (With Local Backend)

This tests the complete development environment including Firebase emulator:

1. **Complete Option A first** - make sure the basic setup works

2. **Start Firebase Emulator**:
   - Open Terminal
   - Navigate to your template project folder:
     ```bash
     cd ~/Desktop/SpeziTemplateApplication-main
     ```
     (Adjust the path based on where you downloaded it)
   
   - Start the emulators:
     ```bash
     firebase emulators:start
     ```

3. **What you should see**:
   - Terminal shows "All emulators ready!"
   - Lists of running services (Auth, Firestore, Functions, etc.)
   - Web UI available at `http://127.0.0.1:4000`

4. **Test the web interface**:
   - Open Safari or Chrome
   - Go to `http://127.0.0.1:4000`
   - You should see the Firebase Emulator Suite dashboard
   - Shows tabs for Authentication, Firestore, Functions, etc.

5. **Run the app with emulator**:
   - Go back to Xcode
   - The app should already be configured to use local emulator in development
   - Run the app again (click the Play button)
   - This time you should see the full onboarding flow with sign-up/login screens

6. **Test the connection**:
   - Create a test account in the app
   - Go back to the Firebase web interface (`http://127.0.0.1:4000`)
   - Click the "Authentication" tab
   - You should see your test user listed

### Troubleshooting the Test

**App won't build**:
- Check that you're using the right simulator (not "Any iOS Device")
- Try cleaning the build: Product → Clean Build Folder
- Restart Xcode and try again

**Simulator doesn't appear**:
- Make sure you have iOS simulators installed
- In Xcode: Window → Devices and Simulators → Simulators
- Download additional simulators if needed

**Firebase emulator won't start**:
- Make sure you're in the right directory (where `firebase.json` exists)
- Check that ports 4000-4499 aren't being used by other apps
- Try `firebase emulators:start --only auth,firestore` for minimal setup

**Can't access emulator web interface**:
- Make sure the emulator is still running (check Terminal)
- Try `http://localhost:4000` instead of `127.0.0.1:4000`
- Check that your firewall isn't blocking the connection

## Next Steps

✅ **You're ready to develop with Spezi!** 

Continue to the [Quick Start Guide](quick-start.md) to create your first Spezi application.

You can also:
- Explore the Spezi modules to see what features are available
- Follow tutorials to learn specific development techniques

## Common Issues and Solutions

### Xcode Problems

**"Xcode won't install from App Store"**
- **Check disk space**: You need at least 25GB free
- **Check internet**: Large download requires stable connection
- **Check Apple ID**: Make sure you're signed into the App Store
- **Try later**: App Store sometimes has temporary issues

**"Xcode keeps crashing or won't open"**
- **Restart your Mac**: Solves many Xcode issues
- **Check macOS version**: Xcode 16.2+ requires macOS Sequoia 15.2+
- **Reset Xcode preferences**: Delete `~/Library/Preferences/com.apple.dt.Xcode.plist`
- **Reinstall Xcode**: Delete from Applications folder and reinstall

**"Build errors about missing command line tools"**
- Run in Terminal: `xcode-select --install`
- Follow prompts to install additional components
- Restart Xcode after installation

### Setup Script Problems

**"Permission denied" or "sudo required"**
- The script may prompt for your Mac password - this is normal
- Type your password (you won't see characters) and press Enter
- Don't use `sudo` unless explicitly told to

**"curl: command not found"**
- This is very rare on modern Macs
- Try copying the script URL and downloading it manually in Safari
- Save as `setup.sh` and run: `bash setup.sh`

**"Homebrew installation failed"**
- Check [brew.sh](https://brew.sh) for current installation instructions
- Make sure you're running the command in Terminal (not another app)
- Check internet connection and firewall settings

### Firebase Emulator Issues

**"Firebase command not found"**
- Run: `npm install -g firebase-tools` 
- If npm isn't found, Node.js wasn't installed correctly
- Try: `brew install node` then retry Firebase installation

**"Port 4000 already in use"**
- Something else is using port 4000
- Try: `firebase emulators:start --port 5000`
- Or find and stop the other application using the port

**"Java not found" when starting emulator**
- Install Java: `brew install openjdk`
- Add to path: `echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc`
- Restart Terminal and try again

### Build and Simulator Issues

**"No iOS simulators available"**
- In Xcode: Window → Devices and Simulators → Simulators
- Click the "+" to add simulators
- Download iOS 18.0 or later simulators

**"Build failed with signing errors"**
- For simulators, you don't need signing certificates
- Make sure you selected a simulator, not "Any iOS Device"
- Try: Product → Clean Build Folder, then build again

**"Simulator is too slow or unresponsive"**
- Simulator requires significant RAM (8GB+ recommended)
- Close other applications to free up memory
- In Simulator: Device → Erase All Content and Settings

### General Development Issues

**"Command not found" in Terminal**
- Restart Terminal to reload environment variables
- Check if command was installed correctly
- For Homebrew commands, try: `brew doctor`

**"Xcode can't find project dependencies"**
- Delete the project's `DerivedData` folder
- In Xcode: Product → Clean Build Folder
- Close and reopen the project

**"Network errors during builds"**
- Check internet connection
- Some corporate networks block package downloads
- Try using personal hotspot if on company network

### Getting Additional Help

If you're still stuck:

1. **Check error messages carefully** - they often contain specific solutions
2. **Search the [Spezi GitHub Issues](https://github.com/StanfordSpezi/Spezi/issues)**
3. **Visit [Apple Developer Forums](https://developer.apple.com/forums/)** for Xcode-specific issues
4. **Ask on [Stack Overflow](https://stackoverflow.com)** with tags: `ios`, `swift`, `xcode`
5. **Join the Spezi community** discussions on GitHub

### System Requirements Checklist

Before asking for help, verify you meet all requirements:

- ✅ macOS Sequoia 15.2 or newer
- ✅ At least 25GB free disk space
- ✅ Stable internet connection
- ✅ Admin access to your Mac (for installing tools)
- ✅ Xcode 16.2 or newer successfully installed
- ✅ All development tools installed without errors

### Clean Reinstall (Last Resort)

If nothing else works:

1. **Remove everything**:
   ```bash
   # Remove Homebrew
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
   
   # Remove Node.js
   sudo rm -rf /usr/local/lib/node_modules
   sudo rm -rf ~/.npm
   ```

2. **Delete Xcode** from Applications folder

3. **Restart your Mac**

4. **Start over** with this guide from Step 1