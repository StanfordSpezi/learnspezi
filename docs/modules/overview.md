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

### SpeziViews
Common UI components and utilities.

**Package**: `https://github.com/StanfordSpezi/SpeziViews`

**Key Features:**
- Reusable SwiftUI components
- Form validation
- Accessibility helpers
- Design system components

## Health & Wellness Modules

### SpeziHealthKit
HealthKit integration for health data access.

**Package**: `https://github.com/StanfordSpezi/SpeziHealthKit`

**Key Features:**
- HealthKit permission management
- Health data reading and writing
- Data type abstractions
- Privacy-compliant data handling

### SpeziBluetooth
Bluetooth device connectivity and communication.

**Package**: `https://github.com/StanfordSpezi/SpeziBluetooth`

**Key Features:**
- Bluetooth device discovery
- Device pairing and management
- Data streaming
- Device-specific protocols

### SpeziDevices
Abstracts common interactions with Bluetooth Devices that are implemented using SpeziBluetooth.

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

### SpeziAccount
User account management and authentication.

**Package**: `https://github.com/StanfordSpezi/SpeziAccount`

**Key Features:**
- User registration and login
- Account profile management
- Authentication state
- Secure data storage

### SpeziQuestionnaire
Survey and questionnaire administration.

**Package**: `https://github.com/StanfordSpezi/SpeziQuestionnaire`

**Key Features:**
- ResearchKit integration
- Custom questionnaire creation
- Response collection
- Data export

## Advanced Modules

### SpeziLLM
Local AI/ML capabilities for privacy-preserving applications.

**Package**: `https://github.com/StanfordSpezi/SpeziLLM`

**Key Features:**
- Local language model execution
- Chat interfaces
- Model management
- Privacy-preserving AI

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

## Getting Help

- **Module Documentation**: Each module has detailed documentation
- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions in GitHub Discussions
- **Examples**: Check the [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication)

---

<div class="admonition tip" markdown="1">
**Pro Tip**: Start with a few essential modules and gradually add more as your application grows. This approach helps you understand how modules interact and keeps your app performant.
</div> 