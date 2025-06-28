# Getting Started with Spezi Template Application

## Overview

This tutorial will guide you through setting up and running your first Spezi application using the official Spezi Template Application. By the end of this tutorial, you'll have a fully functional health app that demonstrates core Spezi features including HealthKit integration, user management, and data storage.

**What you'll build:** A health tracking application with step counting, heart rate monitoring, and user profile management.

**What you'll learn:**
- How to set up a new Spezi project
- Basic Spezi module configuration
- HealthKit integration
- User interface development with SwiftUI
- Testing and debugging Spezi applications

## Prerequisites

Before starting this tutorial, ensure you have:

- **Xcode 15.0+** installed on macOS
- **iOS 17.0+** as the deployment target
- **Apple Developer Account** (free or paid)
- **Physical iOS device** (recommended for HealthKit testing)
- **Git** installed on your system

## Step 1: Clone the Template Application

Start by cloning the Spezi Template Application repository:

```bash
git clone https://github.com/StanfordSpezi/SpeziTemplateApplication.git
cd SpeziTemplateApplication
```

## Step 2: Open the Project in Xcode

1. Open Xcode
2. Select "Open a project or file"
3. Navigate to the cloned `SpeziTemplateApplication` folder
4. Select the `.xcodeproj` file and click "Open"

## Step 3: Configure Your Project

### Update Bundle Identifier

1. Select the project in the navigator
2. Select the target "SpeziTemplateApplication"
3. In the "General" tab, update the Bundle Identifier to something unique:
   ```
   com.yourcompany.spezitemplate
   ```

### Configure Team and Signing

1. In the "Signing & Capabilities" tab:
   - Select your development team
   - Ensure "Automatically manage signing" is checked
   - Verify the provisioning profile is created successfully

### Add HealthKit Capability

1. In the "Signing & Capabilities" tab:
   - Click the "+" button to add a capability
   - Search for "HealthKit" and add it
   - This enables HealthKit integration for your app

## Step 4: Explore the Project Structure

The template application includes several key components:

```
SpeziTemplateApplication/
├── App/
│   ├── SpeziTemplateApplicationApp.swift    # Main app entry point
│   └── ContentView.swift                    # Root view
├── Views/
│   ├── HomeView.swift                       # Main dashboard
│   ├── ProfileView.swift                    # User profile
│   └── SettingsView.swift                   # App settings
├── Models/
│   └── UserProfile.swift                    # User data model
└── Resources/
    └── Info.plist                           # App configuration
```

## Step 5: Understand the Spezi Configuration

Open `SpeziTemplateApplicationApp.swift` to see how Spezi is configured:

```swift
import SwiftUI
import Spezi
import SpeziHealthKit
import SpeziUser

@main
struct SpeziTemplateApplicationApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(
            // HealthKit integration
            HealthKit(
                healthKitTypes: [.stepCount, .heartRate],
                readPermissions: [.stepCount, .heartRate],
                writePermissions: []
            ),
            // User management
            User(
                authenticationMethod: .biometric,
                requireAuthentication: true
            )
        )
    }
}
```

### Key Components Explained:

- **HealthKit Module**: Handles health data access and permissions
- **User Module**: Manages user authentication and profiles
- **Configuration**: Specifies which health data types to access

## Step 6: Run the Application

1. Connect your iOS device (recommended for HealthKit testing)
2. Select your device as the run destination
3. Press `Cmd + R` or click the "Run" button
4. The app will build and launch on your device

### First Launch Experience

When you first launch the app, you'll see:

1. **Welcome Screen**: Introduction to the app
2. **Permission Requests**: HealthKit permissions dialog
3. **User Setup**: Create your user profile
4. **Main Dashboard**: View your health data

## Step 7: Test HealthKit Integration

### Grant HealthKit Permissions

1. When prompted, allow the app to access your health data
2. Go to Settings > Privacy & Security > Health > SpeziTemplateApplication
3. Enable permissions for:
   - Steps
   - Heart Rate

### Add Sample Data

To test with sample data:

1. Open the Health app on your device
2. Add some step count data for today
3. Return to your Spezi app
4. The data should appear in the dashboard

## Step 8: Customize the Application

### Update the App Name and Icon

1. In Xcode, select the project
2. Update the Display Name in Info.plist
3. Replace the app icon in Assets.xcassets

### Modify Health Data Types

To track different health metrics, update the HealthKit configuration:

```swift
HealthKit(
    healthKitTypes: [
        .stepCount,
        .heartRate,
        .activeEnergyBurned,
        .sleepAnalysis
    ],
    readPermissions: [
        .stepCount,
        .heartRate,
        .activeEnergyBurned,
        .sleepAnalysis
    ],
    writePermissions: [.stepCount]
)
```

### Add Custom Views

Create new SwiftUI views in the `Views` folder:

```swift
import SwiftUI

struct CustomHealthView: View {
    @Environment(\.healthKit) private var healthKit
    
    var body: some View {
        VStack {
            Text("Custom Health View")
            // Add your custom health UI here
        }
    }
}
```

## Step 9: Debugging and Troubleshooting

### Common Issues

**HealthKit Permissions Not Working:**
- Ensure HealthKit capability is added
- Check that permissions are granted in Settings
- Verify the device has health data available

**Build Errors:**
- Clean the build folder (`Cmd + Shift + K`)
- Reset package caches in Xcode
- Ensure all dependencies are resolved

**Runtime Crashes:**
- Check the Xcode console for error messages
- Verify all required permissions are granted
- Test on a physical device (HealthKit doesn't work in simulator)

### Debug Tools

Use Xcode's debugging features:

1. **Breakpoints**: Set breakpoints in your code to inspect variables
2. **Console**: View log messages and errors
3. **Debug Navigator**: Monitor app performance and memory usage

## Step 10: Prepare for Production

### Code Signing

1. Ensure your app is properly signed with a distribution certificate
2. Test on multiple devices to verify compatibility

### App Store Preparation

1. Update the app metadata in App Store Connect
2. Prepare screenshots and app description
3. Test the app thoroughly before submission

### Privacy Considerations

1. Review your app's privacy policy
2. Ensure HealthKit usage is clearly explained
3. Implement proper data handling and security measures

## Next Steps

Congratulations! You've successfully set up and run your first Spezi application. Here's what you can explore next:

### Continue Learning

- **Health & Wellness Modules**: Learn about specialized health tracking features
- **User Experience Modules**: Enhance your app with better UX patterns
- **Advanced Modules**: Explore machine learning and research capabilities

### Build More Features

- Add more health data types
- Implement data visualization
- Create custom health insights
- Add social features

### Join the Community

- Visit the [Spezi GitHub repository](https://github.com/StanfordSpezi/Spezi)
- Join discussions in the [GitHub Discussions](https://github.com/StanfordSpezi/Spezi/discussions)
- Contribute to the project

---

**Ready for the next challenge?** Try the [Health Tracking App](health-tracking-app.md) tutorial to build a more comprehensive health application! 