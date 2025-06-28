# Core Modules

## Overview

Core modules provide the fundamental building blocks for Spezi applications. These modules handle essential functionality that most digital health applications require.

## Available Core Modules

### 1. HealthKit Integration

The HealthKit module provides seamless integration with Apple's HealthKit framework, allowing your app to read and write health data.

```swift
import Spezi
import SpeziHealthKit

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(HealthKit())
    }
}
```

**Key Features:**
- Automatic permission handling
- Data synchronization
- Real-time health data access
- Privacy-compliant data handling

### 2. FHIR Integration

The FHIR module enables interoperability with healthcare systems using the FHIR (Fast Healthcare Interoperability Resources) standard.

```swift
import Spezi
import SpeziFHIR

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(FHIR())
    }
}
```

**Key Features:**
- FHIR resource management
- RESTful API integration
- Data validation
- Standard compliance

### 3. User Management

The User module handles user authentication, profiles, and session management.

```swift
import Spezi
import SpeziUser

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(User())
    }
}
```

**Key Features:**
- User authentication
- Profile management
- Session handling
- Privacy controls

### 4. Data Storage

The Storage module provides secure, local data storage with encryption and backup capabilities.

```swift
import Spezi
import SpeziStorage

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Storage())
    }
}
```

**Key Features:**
- Encrypted local storage
- Automatic backups
- Data versioning
- Migration support

## Configuration

Core modules can be configured using their respective configuration options:

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(
            HealthKit(
                healthKitTypes: [.stepCount, .heartRate],
                readPermissions: [.stepCount, .heartRate],
                writePermissions: [.stepCount]
            ),
            FHIR(
                serverURL: "https://fhir.example.com",
                clientId: "your-client-id"
            ),
            User(
                authenticationMethod: .biometric,
                requireAuthentication: true
            )
        )
    }
}
```

## Best Practices

1. **Start with Core Modules**: Begin your app development with the essential core modules
2. **Configure Permissions**: Always configure appropriate permissions for HealthKit and other sensitive data
3. **Handle Errors**: Implement proper error handling for module initialization and data access
4. **Test Integration**: Thoroughly test module integration before adding custom modules
5. **Follow Privacy Guidelines**: Ensure your app complies with privacy regulations and guidelines

## Next Steps

- Learn about [Health & Wellness Modules](health-wellness.md)
- Explore [User Experience Modules](user-experience.md)
- Discover [Advanced Modules](advanced-modules.md)
- Start [Building Your Own Modules](../building-modules/overview.md) 