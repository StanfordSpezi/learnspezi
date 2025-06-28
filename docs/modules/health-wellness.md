# Health & Wellness Modules

## Overview

Health and wellness modules provide specialized functionality for tracking, analyzing, and managing health-related data and activities.

## Available Health & Wellness Modules

### 1. Activity Tracking

The Activity module provides comprehensive activity tracking capabilities, including steps, workouts, and movement patterns.

```swift
import Spezi
import SpeziActivity

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Activity())
    }
}
```

**Key Features:**
- Step counting and analysis
- Workout detection and tracking
- Activity level classification
- Goal setting and progress tracking

### 2. Vital Signs Monitoring

The VitalSigns module handles monitoring of essential health metrics like heart rate, blood pressure, and temperature.

```swift
import Spezi
import SpeziVitalSigns

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(VitalSigns())
    }
}
```

**Key Features:**
- Real-time vital signs monitoring
- Trend analysis and alerts
- Integration with medical devices
- Clinical data validation

### 3. Medication Management

The Medication module helps users manage their medications, including reminders, tracking, and interaction checking.

```swift
import Spezi
import SpeziMedication

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Medication())
    }
}
```

**Key Features:**
- Medication scheduling and reminders
- Dosage tracking
- Drug interaction checking
- Prescription management

### 4. Nutrition Tracking

The Nutrition module provides comprehensive nutrition tracking and analysis capabilities.

```swift
import Spezi
import SpeziNutrition

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Nutrition())
    }
}
```

**Key Features:**
- Food logging and analysis
- Calorie and macro tracking
- Dietary restriction management
- Meal planning assistance

### 5. Sleep Analysis

The Sleep module tracks and analyzes sleep patterns to help improve sleep quality.

```swift
import Spezi
import SpeziSleep

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(Sleep())
    }
}
```

**Key Features:**
- Sleep stage detection
- Sleep quality scoring
- Sleep hygiene recommendations
- Sleep pattern analysis

## Integration Examples

### Combining Multiple Health Modules

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .spezi(
            Activity(
                trackSteps: true,
                trackWorkouts: true,
                dailyGoal: 10000
            ),
            VitalSigns(
                monitorHeartRate: true,
                monitorBloodPressure: true,
                alertThresholds: [
                    .heartRate: (min: 60, max: 100)
                ]
            ),
            Medication(
                enableReminders: true,
                checkInteractions: true,
                syncWithPharmacy: true
            )
        )
    }
}
```

### Custom Health Views

```swift
struct HealthDashboardView: View {
    @Environment(\.activity) private var activity
    @Environment(\.vitalSigns) private var vitalSigns
    
    var body: some View {
        VStack {
            // Activity summary
            ActivitySummaryView(activity: activity)
            
            // Vital signs display
            VitalSignsView(vitalSigns: vitalSigns)
            
            // Health insights
            HealthInsightsView()
        }
    }
}
```

## Data Privacy and Security

Health and wellness modules prioritize data privacy and security:

- **Local Processing**: Sensitive health data is processed locally when possible
- **Encryption**: All health data is encrypted at rest and in transit
- **User Control**: Users have full control over what data is shared
- **Compliance**: Modules comply with HIPAA and other relevant regulations

## Best Practices

1. **Respect User Privacy**: Always ask for explicit consent before accessing health data
2. **Provide Context**: Explain why specific health data is needed
3. **Offer Value**: Ensure health insights provide meaningful value to users
4. **Handle Sensitive Data**: Implement proper security measures for health information
5. **Regular Updates**: Keep health modules updated with the latest medical guidelines

## Next Steps

- Explore [User Experience Modules](user-experience.md)
- Discover [Advanced Modules](advanced-modules.md)
- Learn about [Building Custom Modules](../building-modules/overview.md)
- Check out [Core Modules](core-modules.md) 