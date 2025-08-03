# Core Concepts Overview 🏗️

Spezi is built around a few key concepts that work together to create a modular, interoperable digital health framework. Understanding these core concepts is essential for building effective Spezi applications.

## The Spezi Architecture

At its heart, Spezi follows a **modular architecture** where applications are built by combining reusable components called **Modules**. These modules communicate through a central coordinator called a **Standard**.

```
┌─────────────────────────────────────────────────────────────┐
│                    Spezi Application                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Module A  │  │   Module B  │  │   Module C  │          │
│  │             │  │             │  │             │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          │                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    Standard                         │    │
│  │              (Central Coordinator)                  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Key Building Blocks

### 1. Standard 📋

A **Standard** is the central coordinator that orchestrates data flow and communication between modules in your application. In Spezi, Standards are implemented as Swift actors to ensure thread-safe operation.

**Example Standard:**
```swift
actor TemplateApplicationStandard: Standard, 
    HealthKitConstraint, 
    OnboardingConstraint,
    AccountNotifyConstraint {
    
    // Handle cross-module data flow and business logic
    func add(sample: HKSample) async {
        // Process and store health data
    }
    
    func deletedAccount() async throws {
        // Handle account deletion across modules
    }
}
```

### 2. Module 🧩

A **Module** is a self-contained software component that provides specific functionality. Spezi modules can be mixed and matched to build different applications.

**Module Characteristics:**
- **Reusable**: Can be used across different applications
- **Self-contained**: Has its own logic and UI components
- **Interoperable**: Can communicate with other modules
- **Configurable**: Can be customized for different use cases

**Example Module Usage:**
```swift
import SpeziHealthKit
import SpeziOnboarding
import SpeziAccount
import SpeziFirebaseAccount
import SpeziFirestore
import SpeziQuestionnaire
import SpeziScheduler
import SpeziNotifications

// Configure modules in your app delegate
configure {
    if !FeatureFlags.disableFirebase {
        FirebaseConfiguration()
        Firestore(settings: .emulator)
        FirebaseAccountConfiguration()
    }
    
    if HKHealthStore.isHealthDataAvailable() {
        HealthKit {
            CollectSamples(\.stepCount, deliverySetting: .background(.afterAuthorizationAndApplicationWillLaunch))
        }
    }
    
    AccountConfiguration(configuration: [
        .requires(\.userId),
        .supports(\.name)
    ])
    
    OnboardingDataSource()
    TemplateApplicationScheduler()
    NotificationHandler()
}
```

### 3. Constraint System 🔒

The **Constraint System** allows modules to specify requirements that must be met by the Standard or other modules through protocol conformance.

**Types of Constraints:**
- **Protocol Constraints**: Standards must conform to specific protocols
- **Data Handling**: Define how modules interact with shared data
- **Lifecycle Events**: Handle module events and notifications
- **Permission Requirements**: Specify system permissions needed

**Example Constraints:**
```swift
// Standard conforms to constraints to handle module interactions
actor TemplateApplicationStandard: Standard, 
    HealthKitConstraint,           // Handle HealthKit data
    OnboardingConstraint,          // Manage onboarding state
    AccountNotifyConstraint {      // Handle account events
    
    // HealthKitConstraint implementation
    func add(sample: HKSample) async {
        // Store health sample to Firestore
    }
    
    // AccountNotifyConstraint implementation  
    func deletedAccount() async throws {
        // Clean up user data across modules
    }
}
```

## Data Flow in Spezi

### 1. Module Communication

Modules communicate through the Standard using dependency injection and constraint protocols. The Standard acts as a central coordinator that implements constraint protocols to handle cross-module interactions:

```swift
// HealthKit module sends data to Standard
actor TemplateApplicationStandard: HealthKitConstraint {
    func add(sample: HKSample) async {
        // Process health sample
        let processedData = await processHealthSample(sample)
        
        // Store in Firestore if configured
        if let firestore = modules.get(Firestore.self) {
            await firestore.store(processedData)
        }
    }
}
```

### 2. State Management

Application state is managed through individual modules and SwiftUI's state management system, with the Standard coordinating data flow between modules:

```swift
// State is managed at the app level using SwiftUI
@main
struct TemplateApplication: App {
    @AppStorage(StorageKeys.onboardingFlowComplete) 
    var completedOnboardingFlow = false
    
    @State private var accountSetup = false
    
    var body: some Scene {
        WindowGroup {
            if completedOnboardingFlow {
                HomeView()
            } else {
                OnboardingFlow { 
                    completedOnboardingFlow = true 
                }
            }
        }
        .spezi(AppDelegate())
    }
}
```

### 3. Lifecycle Management

Modules are configured through the Spezi configuration system and integrate with app lifecycle events:

```swift
class TemplateApplicationDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration(standard: TemplateApplicationStandard()) {
            // Configure modules during app initialization
            if !FeatureFlags.disableFirebase {
                FirebaseConfiguration()
                Firestore(settings: .emulator)
            }
            
            AccountConfiguration(configuration: [
                .requires(\.userId),
                .supports(\.name)
            ])
            
            if HKHealthStore.isHealthDataAvailable() {
                HealthKit {
                    CollectSamples(\.stepCount, deliverySetting: .background(.afterAuthorizationAndApplicationWillLaunch))
                }
            }
        }
    }
}
```

## Module Categories

Spezi modules fall into several categories based on their functionality:

### Core Modules
- **Spezi**: The main framework
- **SpeziViews**: Common UI components
- **SpeziValidation**: Data validation utilities

### Health & Wellness
- **SpeziHealthKit**: HealthKit integration
- **SpeziBluetooth**: Bluetooth device connectivity
- **SpeziDevices**: Health device management

### User Experience
- **SpeziOnboarding**: User onboarding flows
- **SpeziAccount**: User account management
- **SpeziQuestionnaire**: Survey and questionnaire tools

### Advanced Features
- **SpeziLLM**: Local AI/ML capabilities
- **SpeziFHIR**: Healthcare data standards
- **SpeziScheduler**: Task scheduling and notifications
- **SpeziFirestore**: Firebase cloud storage integration
- **SpeziFirebaseAccount**: Firebase-based user authentication

## Best Practices

### 1. Module Design
- Keep modules focused on a single responsibility
- Design modules to be reusable across applications
- Use clear interfaces for module communication
- Document module requirements and capabilities

### 2. Standard Configuration
- Configure modules in a logical order
- Handle module dependencies properly
- Provide meaningful error messages for missing requirements
- Use type-safe communication between modules

### 3. Application Architecture
- Start with essential modules and add complexity gradually
- Use the constraint system to ensure proper module integration
- Test modules individually and in combination
- Plan for module updates and versioning

## Common Patterns

### 1. Module Composition
```swift
class TemplateApplicationDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration(standard: TemplateApplicationStandard()) {
            // Essential modules
            OnboardingDataSource()
            AccountConfiguration(configuration: [
                .requires(\.userId),
                .supports(\.name)
            ])
            
            // Conditional module loading
            if !FeatureFlags.disableFirebase {
                FirebaseConfiguration()
                Firestore(settings: .production)
                FirebaseAccountConfiguration()
            }
            
            // Feature-specific modules
            if HKHealthStore.isHealthDataAvailable() {
                HealthKit {
                    CollectSamples(\.stepCount, deliverySetting: .background(.afterAuthorizationAndApplicationWillLaunch))
                }
            }
            
            TemplateApplicationScheduler()
            NotificationHandler()
        }
    }
}
```

### 2. Data Sharing
```swift
// Data sharing happens through the Standard's constraint implementations
actor TemplateApplicationStandard: Standard, 
    HealthKitConstraint, 
    AccountNotifyConstraint {
    
    // HealthKit data flows through the Standard
    func add(sample: HKSample) async {
        // Process and store health sample
        guard let firestore = modules.get(Firestore.self) else { return }
        
        // Store in user's Firestore collection
        let document = firestore.collection("users")
            .document(userId)
            .collection("HealthSamples")
            .document()
            
        try? await document.setData(from: sample)
    }
    
    // Account events trigger data cleanup
    func deletedAccount() async throws {
        // Clean up user data across all modules
        try await cleanupUserData()
    }
}
```

### 3. Error Handling
```swift
// Error handling in Spezi follows Swift's async/await error handling patterns
actor TemplateApplicationStandard: Standard, AccountNotifyConstraint {
    func deletedAccount() async throws {
        do {
            // Attempt to clean up user data
            try await cleanupFirestoreData()
            try await cleanupHealthKitData()
        } catch {
            // Log error and potentially retry
            print("Failed to cleanup user data: \(error)")
            throw error
        }
    }
    
    private func cleanupFirestoreData() async throws {
        guard let firestore = modules.get(Firestore.self) else { return }
        // Perform cleanup operations
    }
}
```

## Next Steps

Now that you understand the core concepts, explore:

- **[Modules Guide](../modules/overview.md)**: Learn about specific Spezi modules
- **[Tutorials](../tutorials/overview.md)**: Build real applications with step-by-step guides

---

<div class="admonition tip" markdown="1">
**Pro Tip**: The key to successful Spezi development is understanding how modules interact through the Standard. Start with a simple Standard and add modules incrementally to build complexity gradually.
</div> 