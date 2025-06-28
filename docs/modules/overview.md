# Spezi Modules Guide 📦

Spezi's power comes from its rich ecosystem of modules. Each module provides specific functionality that can be combined to build comprehensive digital health applications. This guide covers the available modules and how to use them effectively.

## Module Categories

Spezi modules are organized into several categories based on their functionality:

<div class="grid cards" markdown>

-   🧩 **Core Modules**
    ---
    Essential modules that provide the foundation for Spezi applications.

-   ❤️ **Health & Wellness**
    ---
    Modules for health data collection, device integration, and wellness tracking.

-   👤 **User Experience**
    ---
    Modules for user onboarding, account management, and interface components.

-   🧠 **Advanced Features**
    ---
    Advanced modules for AI, scheduling, and specialized functionality.

</div>

## Core Modules

### Spezi (Main Framework)
The foundation of the Spezi ecosystem.

**Package**: `https://github.com/StanfordSpezi/Spezi`

**Key Features:**
- Standard protocol implementation
- Module lifecycle management
- Data flow coordination
- Constraint system

**Usage:**
```swift
import Spezi

class MyStandard: Standard, ObservableObject {
    // Your standard implementation
}
```

### SpeziViews
Common UI components and utilities.

**Package**: `https://github.com/StanfordSpezi/SpeziViews`

**Key Features:**
- Reusable SwiftUI components
- Form validation
- Accessibility helpers
- Design system components

**Usage:**
```swift
import SpeziViews

struct MyView: View {
    var body: some View {
        VStack {
            // Use SpeziViews components
            SpeziButton("Submit") {
                // Action
            }
        }
    }
}
```

## Health & Wellness Modules

### SpeziHealthKit
HealthKit integration for health data access.

**Package**: `https://github.com/StanfordSpezi/SpeziHealthKit`

**Key Features:**
- HealthKit permission management
- Health data reading and writing
- Data type abstractions
- Privacy-compliant data handling

**Usage:**
```swift
import SpeziHealthKit

// Request HealthKit permissions
HealthKitPermissionView()

// Read health data
let healthStore = HealthKitStore()
let steps = try await healthStore.readSteps(for: Date())
```

### SpeziBluetooth
Bluetooth device connectivity and communication.

**Package**: `https://github.com/StanfordSpezi/SpeziBluetooth`

**Key Features:**
- Bluetooth device discovery
- Device pairing and management
- Data streaming
- Device-specific protocols

**Usage:**
```swift
import SpeziBluetooth

class BluetoothManager: ObservableObject {
    @Published var discoveredDevices: [BluetoothDevice] = []
    
    func startScanning() {
        // Scan for Bluetooth devices
    }
    
    func connect(to device: BluetoothDevice) {
        // Connect to device
    }
}
```

### SpeziDevices
Health device management and integration.

**Package**: `https://github.com/StanfordSpezi/SpeziDevices`

**Key Features:**
- Device abstraction layer
- Device-specific data handling
- Device state management
- Multi-device support

## User Experience Modules

### SpeziOnboarding
User onboarding and consent management.

**Package**: `https://github.com/StanfordSpezi/SpeziOnboarding`

**Key Features:**
- Multi-step onboarding flows
- Consent collection
- Permission requests
- Progress tracking

**Usage:**
```swift
import SpeziOnboarding

struct OnboardingView: View {
    var body: some View {
        OnboardingFlow {
            WelcomeStep {
                WelcomeStepView(
                    title: "Welcome",
                    subtitle: "Get started with your health journey"
                )
            }
            
            ConsentStep {
                ConsentView(
                    title: "Research Consent",
                    description: "Your data will be used for research..."
                )
            }
        }
    }
}
```

### SpeziAccount
User account management and authentication.

**Package**: `https://github.com/StanfordSpezi/SpeziAccount`

**Key Features:**
- User registration and login
- Account profile management
- Authentication state
- Secure data storage

**Usage:**
```swift
import SpeziAccount

struct AccountView: View {
    var body: some View {
        AccountSetupView()
    }
}
```

### SpeziQuestionnaire
Survey and questionnaire administration.

**Package**: `https://github.com/StanfordSpezi/SpeziQuestionnaire`

**Key Features:**
- ResearchKit integration
- Custom questionnaire creation
- Response collection
- Data export

**Usage:**
```swift
import SpeziQuestionnaire

struct QuestionnaireView: View {
    var body: some View {
        QuestionnaireView(
            questionnaire: myQuestionnaire
        )
    }
}
```

## Advanced Modules

### SpeziLLM
Local AI/ML capabilities for privacy-preserving applications.

**Package**: `https://github.com/StanfordSpezi/SpeziLLM`

**Key Features:**
- Local language model execution
- Chat interfaces
- Model management
- Privacy-preserving AI

**Usage:**
```swift
import SpeziLLM

struct ChatView: View {
    @StateObject private var chatModel = LocalChatModel()
    
    var body: some View {
        ChatView(chatModel: chatModel)
    }
}
```

### SpeziScheduler
Task scheduling and notification management.

**Package**: `https://github.com/StanfordSpezi/SpeziScheduler`

**Key Features:**
- Task scheduling
- Local notifications
- Reminder management
- Calendar integration

### SpeziFHIR
Healthcare data standards support.

**Package**: `https://github.com/StanfordSpezi/SpeziFHIR`

**Key Features:**
- FHIR resource handling
- Healthcare data interoperability
- Standard compliance
- Data validation

## Module Integration Patterns

### 1. Basic Module Setup
```swift
class MyAppStandard: Standard, ObservableObject {
    init() {
        // Add essential modules
        add(OnboardingModule())
        add(AccountModule())
        add(HealthKitModule())
    }
}
```

### 2. Conditional Module Loading
```swift
class MyAppStandard: Standard, ObservableObject {
    init(configuration: AppConfiguration) {
        // Always add core modules
        add(OnboardingModule())
        add(AccountModule())
        
        // Add optional modules based on configuration
        if configuration.enableHealthKit {
            add(HealthKitModule())
        }
        
        if configuration.enableBluetooth {
            add(BluetoothModule())
        }
        
        if configuration.enableAI {
            add(LLMModule())
        }
    }
}
```

### 3. Module Configuration
```swift
class MyAppStandard: Standard, ObservableObject {
    init() {
        // Configure modules with specific settings
        let onboardingConfig = OnboardingConfiguration(
            steps: [.welcome, .consent, .permissions],
            allowSkip: false
        )
        add(OnboardingModule(configuration: onboardingConfig))
        
        let healthConfig = HealthKitConfiguration(
            dataTypes: [.steps, .heartRate, .sleep],
            readOnly: true
        )
        add(HealthKitModule(configuration: healthConfig))
    }
}
```

## Module Dependencies

Some modules depend on others. Here's a typical dependency chain:

```
Spezi (Core)
├── SpeziViews
├── SpeziOnboarding
│   └── SpeziAccount
├── SpeziHealthKit
├── SpeziBluetooth
│   └── SpeziDevices
└── SpeziQuestionnaire
    └── SpeziViews
```

## Best Practices

### 1. Module Selection
- Start with core modules for basic functionality
- Add health modules based on your app's needs
- Include UX modules for better user experience
- Consider advanced modules for specialized features

### 2. Performance Considerations
- Load modules only when needed
- Use lazy loading for heavy modules
- Monitor memory usage with multiple modules
- Test module combinations thoroughly

### 3. User Experience
- Ensure smooth transitions between modules
- Maintain consistent UI/UX across modules
- Handle module errors gracefully
- Provide clear feedback for module operations

## Module Development

Want to create your own modules? Check out the [Building Modules](building-modules/overview.md) guide to learn how to:

- Create custom modules
- Define module requirements
- Handle module communication
- Publish modules to the ecosystem

## Getting Help

- **Module Documentation**: Each module has detailed documentation
- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions in GitHub Discussions
- **Examples**: Check the [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication)

---

<div class="admonition tip" markdown="1">
**Pro Tip**: Start with a few essential modules and gradually add more as your application grows. This approach helps you understand how modules interact and keeps your app performant.
</div> 