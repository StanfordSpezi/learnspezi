# Core Concepts Overview 🏗️

Spezi is built around a few key concepts that work together to create a modular, interoperable digital health framework. Understanding these core concepts is essential for building effective Spezi applications.

## The Spezi Architecture

At its heart, Spezi follows a **modular architecture** where applications are built by combining reusable components called **Modules**. These modules communicate through a central coordinator called a **Standard**.

```
┌─────────────────────────────────────────────────────────────┐
│                    Spezi Application                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Module A  │  │   Module B  │  │   Module C  │         │
│  │             │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│         │                │                │                │
│         └────────────────┼────────────────┘                │
│                          │                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Standard                         │   │
│  │              (Central Coordinator)                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Key Building Blocks

### 1. Standard 📋

A **Standard** is the central coordinator that orchestrates data flow and communication between modules in your application.

**Key Responsibilities:**
- Manages module lifecycle
- Coordinates data flow between modules
- Enforces module requirements and constraints
- Provides shared application state

**Example Standard:**
```swift
class MySpeziStandard: Standard, ObservableObject {
    @Published var isOnboardingComplete = false
    @Published var currentUser: User?
    
    init() {
        // Configure modules and their requirements
    }
    
    func configure() {
        // Set up module dependencies and constraints
    }
}
```

### 2. Module 🧩

A **Module** is a self-contained software component that provides specific functionality. Modules can be mixed and matched to build different applications.

**Module Characteristics:**
- **Reusable**: Can be used across different applications
- **Self-contained**: Has its own logic and UI components
- **Interoperable**: Can communicate with other modules
- **Configurable**: Can be customized for different use cases

**Example Module Usage:**
```swift
// HealthKit Module provides health data access
import SpeziHealthKit

// Onboarding Module handles user onboarding
import SpeziOnboarding

// Account Module manages user accounts
import SpeziAccount
```

### 3. Constraint System 🔒

The **Constraint System** allows modules to specify requirements that must be met by the Standard or other modules.

**Types of Constraints:**
- **Requirements**: What a module needs to function
- **Dependencies**: Other modules that must be present
- **Permissions**: System permissions required
- **Data Types**: Specific data formats needed

**Example Constraints:**
```swift
// Module requires HealthKit access
@Requirement(HealthKitPermission.self)
class HealthDataModule: Module {
    // Module implementation
}

// Module requires user authentication
@Requirement(UserAccount.self)
class SecureDataModule: Module {
    // Module implementation
}
```

## Data Flow in Spezi

### 1. Module Communication

Modules communicate through the Standard using a publish-subscribe pattern:

```swift
// Module A publishes data
spezi.publish(HealthData(steps: 10000))

// Module B subscribes to data
spezi.subscribe(to: HealthData.self) { data in
    // Handle health data updates
}
```

### 2. State Management

The Standard manages shared application state:

```swift
class MySpeziStandard: Standard, ObservableObject {
    @Published var userProfile: UserProfile?
    @Published var healthData: [HealthData] = []
    @Published var isAuthenticated = false
    
    // Modules can observe and update this state
}
```

### 3. Lifecycle Management

Modules have well-defined lifecycle events:

```swift
class MyModule: Module {
    func configure() {
        // Called when module is first configured
    }
    
    func willLaunch() {
        // Called before app launches
    }
    
    func didLaunch() {
        // Called after app launches
    }
    
    func willTerminate() {
        // Called before app terminates
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
class MyAppStandard: Standard {
    init() {
        // Add essential modules
        add(OnboardingModule())
        add(AccountModule())
        add(HealthKitModule())
        
        // Add optional modules based on configuration
        if enableQuestionnaires {
            add(QuestionnaireModule())
        }
    }
}
```

### 2. Data Sharing
```swift
// Define shared data types
struct UserProfile: Codable {
    let id: String
    let name: String
    let email: String
}

// Modules can publish and subscribe to this data
spezi.publish(UserProfile(id: "123", name: "John", email: "john@example.com"))
```

### 3. Error Handling
```swift
class MyModule: Module {
    func handleError(_ error: Error) {
        // Handle module-specific errors
        switch error {
        case HealthKitError.notAuthorized:
            // Request HealthKit permissions
        case NetworkError.connectionFailed:
            // Retry network request
        default:
            // Log and report error
        }
    }
}
```

## Next Steps

Now that you understand the core concepts, explore:

- **[Modules Guide](modules/overview.md)**: Learn about specific Spezi modules
- **[Building Modules](building-modules/overview.md)**: Create your own modules
- **[Advanced Topics](advanced/overview.md)**: Master advanced Spezi features

---

<div class="admonition tip" markdown="1">
**Pro Tip**: The key to successful Spezi development is understanding how modules interact through the Standard. Start with a simple Standard and add modules incrementally to build complexity gradually.
</div> 