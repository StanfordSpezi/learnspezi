# Quick Start Guide 🚀

Welcome to Spezi! This guide will help you create your first Spezi application in minutes. By the end of this tutorial, you'll have a working digital health app with user onboarding, health data collection, and a beautiful UI.

## Prerequisites

Before you begin, make sure you have:

- **macOS 13.0 or later**
- **Xcode 15.0 or later**
- **iOS 16.0+ target** (for iOS apps)
- **Basic knowledge of Swift and SwiftUI**

## Step 1: Create a New Xcode Project

1. Open Xcode and select **"Create a new Xcode project"**
2. Choose **"App"** under iOS
3. Configure your project:
   - **Product Name**: `MySpeziApp`
   - **Team**: Your development team
   - **Organization Identifier**: `com.yourcompany`
   - **Interface**: **SwiftUI**
   - **Language**: **Swift**
   - **Use Core Data**: Unchecked
   - **Include Tests**: Checked (recommended)

## Step 2: Add Spezi Dependencies

1. In Xcode, go to **File → Add Package Dependencies**
2. Add the following packages:

### Core Spezi Framework
```
https://github.com/StanfordSpezi/Spezi
```

### Essential Modules
```
https://github.com/StanfordSpezi/SpeziOnboarding
https://github.com/StanfordSpezi/SpeziAccount
https://github.com/StanfordSpezi/SpeziHealthKit
https://github.com/StanfordSpezi/SpeziViews
```

### Optional Modules (for advanced features)
```
https://github.com/StanfordSpezi/SpeziQuestionnaire
https://github.com/StanfordSpezi/SpeziBluetooth
https://github.com/StanfordSpezi/SpeziLLM
```

## Step 3: Create Your App Structure

Replace your `App.swift` file with this basic Spezi application:

```swift
import SwiftUI
import Spezi
import SpeziOnboarding
import SpeziAccount
import SpeziHealthKit
import SpeziViews

@main
struct MySpeziApp: App {
    @StateObject private var spezi = MySpeziStandard()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .spezi(spezi)
        }
    }
}

// MARK: - Spezi Standard
class MySpeziStandard: Standard, ObservableObject {
    @Published var isOnboardingComplete = false
    
    init() {
        // Configure your standard here
    }
}

// MARK: - Content View
struct ContentView: View {
    @Environment(\.spezi) private var spezi
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Image(systemName: "heart.fill")
                    .font(.system(size: 60))
                    .foregroundColor(.red)
                
                Text("Welcome to MySpeziApp")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                
                Text("Your digital health journey starts here")
                    .font(.title2)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                
                Spacer()
                
                Button("Get Started") {
                    // Navigate to onboarding
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
            }
            .padding()
            .navigationTitle("MySpeziApp")
        }
    }
}

#Preview {
    ContentView()
        .spezi(MySpeziStandard())
}
```

## Step 4: Add Onboarding

Create a new file `OnboardingView.swift`:

```swift
import SwiftUI
import SpeziOnboarding
import SpeziAccount
import SpeziHealthKit

struct OnboardingView: View {
    @Environment(\.spezi) private var spezi
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        OnboardingFlow {
            // Welcome Step
            WelcomeStep {
                WelcomeStepView(
                    title: "Welcome to MySpeziApp",
                    subtitle: "Your personal health companion",
                    description: "This app helps you track your health data and provides personalized insights to improve your wellbeing."
                )
            }
            
            // Account Setup
            AccountSetupStep {
                AccountSetupView()
            }
            
            // HealthKit Permission
            HealthKitPermissionStep {
                HealthKitPermissionView()
            }
            
            // Consent
            ConsentStep {
                ConsentView(
                    title: "Research Consent",
                    description: "By participating in this study, you agree to share your health data for research purposes. Your data will be anonymized and kept secure.",
                    consentText: "I consent to participate in this research study and agree to share my health data for research purposes."
                )
            }
        } onFinish: {
            // Onboarding complete
            dismiss()
        }
    }
}

#Preview {
    OnboardingView()
        .spezi(MySpeziStandard())
}
```

## Step 5: Add Health Data Collection

Create a new file `HealthDataView.swift`:

```swift
import SwiftUI
import SpeziHealthKit
import SpeziViews

struct HealthDataView: View {
    @Environment(\.spezi) private var spezi
    @State private var stepCount: Int = 0
    @State private var heartRate: Double = 0.0
    
    var body: some View {
        List {
            Section("Today's Activity") {
                HStack {
                    Image(systemName: "figure.walk")
                        .foregroundColor(.blue)
                    VStack(alignment: .leading) {
                        Text("Steps")
                            .font(.headline)
                        Text("\(stepCount)")
                            .font(.title2)
                            .fontWeight(.bold)
                    }
                    Spacer()
                }
                
                HStack {
                    Image(systemName: "heart.fill")
                        .foregroundColor(.red)
                    VStack(alignment: .leading) {
                        Text("Heart Rate")
                            .font(.headline)
                        Text("\(Int(heartRate)) BPM")
                            .font(.title2)
                            .fontWeight(.bold)
                    }
                    Spacer()
                }
            }
            
            Section("Actions") {
                Button("Refresh Data") {
                    // Refresh health data
                }
                .buttonStyle(.bordered)
            }
        }
        .navigationTitle("Health Data")
        .onAppear {
            // Load health data
        }
    }
}

#Preview {
    NavigationView {
        HealthDataView()
    }
    .spezi(MySpeziStandard())
}
```

## Step 6: Update Navigation

Update your `ContentView.swift` to include navigation:

```swift
struct ContentView: View {
    @Environment(\.spezi) private var spezi
    @State private var showingOnboarding = false
    
    var body: some View {
        NavigationView {
            List {
                Section("Health") {
                    NavigationLink("Health Data", destination: HealthDataView())
                    NavigationLink("Questionnaires", destination: Text("Questionnaires"))
                }
                
                Section("Settings") {
                    NavigationLink("Account", destination: Text("Account Settings"))
                    NavigationLink("Privacy", destination: Text("Privacy Settings"))
                }
            }
            .navigationTitle("MySpeziApp")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Onboarding") {
                        showingOnboarding = true
                    }
                }
            }
        }
        .sheet(isPresented: $showingOnboarding) {
            OnboardingView()
        }
    }
}
```

## Step 7: Configure Info.plist

Add the following keys to your `Info.plist`:

```xml
<key>NSHealthShareUsageDescription</key>
<string>This app needs access to your health data to provide personalized insights and track your progress.</string>
<key>NSHealthUpdateUsageDescription</key>
<string>This app needs to update your health data to save your progress and achievements.</string>
```

## Step 8: Build and Run

1. Select your target device (iPhone Simulator or physical device)
2. Press **⌘+R** to build and run
3. Your app should launch with the welcome screen

## What You've Built

Congratulations! You've created a Spezi application with:

- ✅ **Modular Architecture**: Using Spezi's modular approach
- ✅ **User Onboarding**: Complete onboarding flow with consent
- ✅ **HealthKit Integration**: Permission handling and data access
- ✅ **Account Management**: User account setup
- ✅ **Clean UI**: Beautiful SwiftUI interface
- ✅ **Navigation**: Proper app navigation structure

## Next Steps

Now that you have a basic Spezi application, explore these next topics:

- **[Core Concepts](core-concepts/overview.md)**: Learn about Standards and Modules
- **[Modules Guide](modules/overview.md)**: Explore more Spezi modules
- **[Building Modules](building-modules/overview.md)**: Create your own modules
- **[Advanced Topics](advanced/overview.md)**: Dive into advanced features

## Troubleshooting

### Common Issues

**Build Errors**: Make sure all package dependencies are properly added and resolved.

**HealthKit Permissions**: Ensure you've added the required privacy descriptions to Info.plist.

**Navigation Issues**: Check that your NavigationView is properly configured.

**Module Not Found**: Verify that you've added the correct package dependencies.

### Getting Help

- Check the [FAQ](faq/overview.md) for common solutions
- Join the [GitHub Discussions](https://github.com/orgs/StanfordSpezi/discussions)
- Review the [API Documentation](https://swiftpackageindex.com/StanfordSpezi/Spezi/documentation)

---

<div class="admonition success" markdown="1">
**Great job!** You've successfully created your first Spezi application. The modular architecture you've built can easily be extended with additional modules for questionnaires, Bluetooth devices, AI features, and more.
</div> 