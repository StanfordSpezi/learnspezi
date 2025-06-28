# User Experience Modules

## Overview

User experience modules enhance the interface and interaction patterns of Spezi applications, providing consistent, accessible, and engaging user experiences.

## Available UX Modules

### 1. Onboarding

The Onboarding module provides guided setup experiences for new users, including permissions, preferences, and initial configuration.

```swift
import Spezi
import SpeziOnboarding

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Onboarding())
    }
}
```

**Key Features:**
- Step-by-step setup wizard
- Permission request handling
- User preference collection
- Progress tracking and persistence

### 2. Notifications

The Notifications module manages push notifications, local alerts, and in-app messaging with smart scheduling and personalization.

```swift
import Spezi
import SpeziNotifications

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Notifications())
    }
}
```

**Key Features:**
- Smart notification scheduling
- Personalized messaging
- Notification preferences
- Engagement analytics

### 3. Accessibility

The Accessibility module ensures your app is usable by people with diverse abilities, providing enhanced accessibility features.

```swift
import Spezi
import SpeziAccessibility

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Accessibility())
    }
}
```

**Key Features:**
- VoiceOver optimization
- Dynamic Type support
- High contrast modes
- Reduced motion support

### 4. Localization

The Localization module provides comprehensive internationalization support for multi-language applications.

```swift
import Spezi
import SpeziLocalization

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Localization())
    }
}
```

**Key Features:**
- Multi-language support
- Cultural adaptation
- Right-to-left language support
- Localized content management

### 5. Analytics

The Analytics module provides insights into user behavior and app performance while respecting privacy.

```swift
import Spezi
import SpeziAnalytics

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Analytics())
    }
}
```

**Key Features:**
- Privacy-preserving analytics
- User journey tracking
- Performance monitoring
- A/B testing support

## Implementation Examples

### Custom Onboarding Flow

```swift
struct CustomOnboardingView: View {
    @Environment(\.onboarding) private var onboarding
    
    var body: some View {
        VStack {
            // Welcome screen
            OnboardingStep(
                title: "Welcome to HealthTracker",
                description: "Let's set up your health profile",
                image: "heart.fill"
            ) {
                onboarding.next()
            }
            
            // Permission requests
            OnboardingStep(
                title: "Health Data Access",
                description: "We need access to track your health metrics",
                image: "heart.text.square"
            ) {
                onboarding.requestHealthPermissions()
            }
            
            // Profile setup
            OnboardingStep(
                title: "Your Profile",
                description: "Tell us about yourself",
                image: "person.circle"
            ) {
                onboarding.complete()
            }
        }
    }
}
```

### Smart Notifications

```swift
struct NotificationManager {
    @Environment(\.notifications) private var notifications
    
    func scheduleHealthReminders() {
        notifications.schedule(
            type: .healthCheck,
            title: "Time for your health check",
            body: "Take a moment to log your daily health metrics",
            trigger: .daily(at: 9, minute: 0),
            userInfo: ["action": "health_check"]
        )
    }
    
    func sendPersonalizedMessage() {
        let userActivity = getRecentActivity()
        let message = generatePersonalizedMessage(for: userActivity)
        
        notifications.send(
            title: "Great progress!",
            body: message,
            category: .motivation
        )
    }
}
```

### Accessibility Enhancements

```swift
struct AccessibleHealthView: View {
    @Environment(\.accessibility) private var accessibility
    
    var body: some View {
        VStack {
            // Health metrics with accessibility labels
            HealthMetricCard(
                title: "Heart Rate",
                value: "72 BPM",
                accessibilityLabel: "Current heart rate is 72 beats per minute"
            )
            
            // Interactive elements with accessibility hints
            Button("Log Activity") {
                logActivity()
            }
            .accessibilityHint("Double tap to log your current activity")
            
            // Dynamic type support
            Text("Health Summary")
                .font(.largeTitle)
                .dynamicTypeSize(.large ... .accessibility3)
        }
        .accessibilityElement(children: .contain)
    }
}
```

## Best Practices

### 1. User-Centered Design
- Design for real user needs and workflows
- Test with diverse user groups
- Iterate based on user feedback

### 2. Accessibility First
- Implement accessibility features from the start
- Test with accessibility tools and users
- Follow WCAG guidelines

### 3. Performance Optimization
- Optimize for smooth animations and transitions
- Minimize loading times
- Handle offline scenarios gracefully

### 4. Privacy and Trust
- Be transparent about data collection
- Provide clear privacy controls
- Build trust through consistent behavior

### 5. Cultural Sensitivity
- Respect cultural differences in design
- Provide appropriate localization
- Consider regional health practices

## Integration with Other Modules

UX modules work seamlessly with other Spezi modules:

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(
            // Core functionality
            HealthKit(),
            User(),
            
            // UX enhancements
            Onboarding(
                steps: [.welcome, .permissions, .profile]
            ),
            Notifications(
                categories: [.health, .motivation, .reminders]
            ),
            Accessibility(
                enableVoiceOver: true,
                supportDynamicType: true
            ),
            Localization(
                supportedLanguages: ["en", "es", "fr", "de"]
            )
        )
    }
}
```

## Next Steps

- Discover [Advanced Modules](advanced-modules.md)
- Learn about [Building Custom Modules](../building-modules/overview.md)
- Explore [Core Modules](core-modules.md)
- Check out [Health & Wellness Modules](health-wellness.md) 