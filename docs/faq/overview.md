# FAQ & Troubleshooting ❓

This section addresses common questions and issues you might encounter while working with Spezi. If you don't find your answer here, check the [GitHub Discussions](https://github.com/orgs/StanfordSpezi/discussions) or [create an issue](https://github.com/StanfordSpezi/Spezi/issues).

## General Questions

### What is Spezi?

**Spezi** is an open-source framework for rapid development of modern, interoperable digital health applications. It provides a modular architecture that allows you to build healthcare apps by combining reusable components.

### What platforms does Spezi support?

Spezi supports:
- **iOS 16.0+**
- **macOS 13.0+**
- **watchOS 9.0+** (limited support)
- **tvOS 16.0+** (limited support)

### Is Spezi free to use?

Yes! Spezi is open-source and free to use under the MIT License. You can use it for both personal and commercial projects.

### How does Spezi compare to other frameworks?

Spezi is specifically designed for digital health applications with:
- **Healthcare Standards**: Built-in support for FHIR and other healthcare standards
- **Privacy-First**: Designed with privacy and security in mind
- **Modular Architecture**: Reusable components for rapid development
- **Research Ready**: Perfect for clinical research and studies

## Getting Started

### How do I add Spezi to my project?

1. In Xcode, go to **File → Add Package Dependencies**
2. Add the main Spezi package: `https://github.com/StanfordSpezi/Spezi`
3. Add any additional modules you need
4. Import Spezi in your Swift files

### What's the minimum Xcode version required?

You need **Xcode 15.0 or later** to use Spezi.

### Do I need to know SwiftUI to use Spezi?

While not strictly required, **basic knowledge of SwiftUI is highly recommended** since Spezi is built on top of SwiftUI and provides many UI components.

### How do I create my first Spezi app?

Follow our [Quick Start Guide](getting-started/quick-start.md) to create your first Spezi application in minutes.

## Module Questions

### What modules should I start with?

For beginners, start with these essential modules:
- **Spezi** (core framework)
- **SpeziViews** (UI components)
- **SpeziOnboarding** (user onboarding)
- **SpeziAccount** (user management)

### How do I know which modules I need?

Consider your app's requirements:
- **Health data**: Use SpeziHealthKit
- **User accounts**: Use SpeziAccount
- **Surveys**: Use SpeziQuestionnaire
- **Device connectivity**: Use SpeziBluetooth
- **AI features**: Use SpeziLLM

### Can I use Spezi modules without the full framework?

No, all Spezi modules require the core Spezi framework to function properly.

### How do I create my own modules?

Check out our [Building Modules](building-modules/overview.md) guide for detailed instructions.

## Common Issues

### Build Errors

#### "Module 'Spezi' not found"

**Solution:**
1. Make sure you've added the Spezi package dependency
2. Check that the package is properly resolved
3. Clean and rebuild your project (⌘+Shift+K, then ⌘+B)

#### "No such module 'SpeziHealthKit'"

**Solution:**
1. Add the specific module package: `https://github.com/StanfordSpezi/SpeziHealthKit`
2. Make sure you're importing the correct module name
3. Check that the module is compatible with your Spezi version

#### Swift version compatibility errors

**Solution:**
- Ensure you're using Swift 5.9 or later
- Update Xcode to the latest version
- Check module compatibility in the package documentation

### Runtime Errors

#### "Standard not found in environment"

**Solution:**
```swift
// Make sure you're using the .spezi() modifier
ContentView()
    .spezi(MyStandard())
```

#### "Module requirement not satisfied"

**Solution:**
1. Check that all required modules are added to your Standard
2. Verify module dependencies are properly configured
3. Ensure modules are added in the correct order

#### HealthKit permission errors

**Solution:**
1. Add required privacy descriptions to Info.plist:
```xml
<key>NSHealthShareUsageDescription</key>
<string>This app needs access to your health data...</string>
<key>NSHealthUpdateUsageDescription</key>
<string>This app needs to update your health data...</string>
```

2. Request permissions properly:
```swift
HealthKitPermissionView()
```

### Performance Issues

#### App takes too long to start

**Solutions:**
- Use lazy loading for heavy modules
- Initialize modules only when needed
- Profile your app to identify bottlenecks

#### Memory usage is high

**Solutions:**
- Implement proper memory management in modules
- Use weak references where appropriate
- Monitor memory usage with Instruments

#### UI is slow or unresponsive

**Solutions:**
- Move heavy operations to background threads
- Use proper SwiftUI patterns
- Avoid blocking the main thread

## HealthKit Issues

### HealthKit permissions not working

**Common causes:**
1. Missing privacy descriptions in Info.plist
2. Testing on simulator (HealthKit requires a real device)
3. User denied permissions

**Solution:**
```swift
// Check authorization status
let healthStore = HKHealthStore()
let status = healthStore.authorizationStatus(for: HKObjectType.quantityType(forIdentifier: .stepCount)!)
```

### HealthKit data not syncing

**Solutions:**
- Ensure HealthKit is enabled on the device
- Check that data types are properly configured
- Verify user has granted necessary permissions

### HealthKit queries returning no data

**Solutions:**
- Check that the device has health data
- Verify date ranges in queries
- Ensure proper error handling

## Bluetooth Issues

### Bluetooth devices not discovered

**Solutions:**
- Check that Bluetooth is enabled
- Ensure proper permissions are granted
- Verify device compatibility

### Connection drops frequently

**Solutions:**
- Implement reconnection logic
- Check device battery levels
- Monitor signal strength

## Module Development

### How do I test my custom module?

**Approach:**
1. Create unit tests for module logic
2. Test module integration with Standard
3. Test module communication with other modules
4. Use the Spezi Template Application for integration testing

### My module isn't being recognized

**Check:**
1. Module conforms to `Module` protocol
2. Module is properly added to Standard
3. Module dependencies are satisfied
4. No build errors in module

### How do I handle module errors?

**Best practices:**
```swift
enum MyModuleError: LocalizedError {
    case configurationError(String)
    case networkError(Error)
    
    var errorDescription: String? {
        switch self {
        case .configurationError(let message):
            return "Configuration error: \(message)"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        }
    }
}
```

## Data and Privacy

### How do I handle sensitive data?

**Best practices:**
- Use encryption for sensitive data
- Implement proper data retention policies
- Follow privacy regulations (GDPR, HIPAA, etc.)
- Use Spezi's built-in privacy features

### How do I export data for research?

**Approach:**
- Use Spezi's data export features
- Implement FHIR compliance
- Ensure proper data anonymization
- Follow institutional review board (IRB) requirements

### How do I implement user consent?

**Solution:**
```swift
import SpeziOnboarding

ConsentStep {
    ConsentView(
        title: "Research Consent",
        description: "Your data will be used for research...",
        consentText: "I consent to participate..."
    )
}
```

## Deployment Issues

### App Store rejection due to HealthKit

**Common issues:**
- Missing privacy policy
- Incomplete privacy descriptions
- Improper data handling

**Solutions:**
- Include comprehensive privacy policy
- Ensure all privacy descriptions are clear
- Follow Apple's HealthKit guidelines

### TestFlight distribution issues

**Solutions:**
- Ensure all dependencies are properly configured
- Test on multiple devices
- Check for any missing entitlements

## Getting Help

### Where can I get help?

1. **Documentation**: Check this tutorial and the [official documentation](https://swiftpackageindex.com/StanfordSpezi/Spezi/documentation)
2. **GitHub Discussions**: [Ask questions](https://github.com/orgs/StanfordSpezi/discussions)
3. **GitHub Issues**: [Report bugs](https://github.com/StanfordSpezi/Spezi/issues)
4. **Community**: Join the Spezi community on social media

### How do I report a bug?

1. Check if the issue is already reported
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Xcode version, iOS version, etc.)
   - Code example if applicable

### How do I contribute to Spezi?

1. **Code contributions**: Submit pull requests
2. **Documentation**: Improve tutorials and guides
3. **Modules**: Create and share custom modules
4. **Community**: Help other developers

## Performance Tips

### General Performance

- **Lazy loading**: Load modules only when needed
- **Caching**: Implement proper data caching
- **Background processing**: Move heavy operations off main thread
- **Memory management**: Use proper memory management patterns

### UI Performance

- **SwiftUI best practices**: Follow SwiftUI guidelines
- **View optimization**: Minimize view updates
- **Image optimization**: Use appropriate image sizes
- **Animation optimization**: Use efficient animations

### Data Performance

- **Batch operations**: Process data in batches
- **Pagination**: Implement pagination for large datasets
- **Compression**: Compress data when appropriate
- **Indexing**: Use proper data indexing

## Security Best Practices

### Data Security

- **Encryption**: Encrypt sensitive data
- **Key management**: Use proper key management
- **Secure storage**: Use Keychain for sensitive data
- **Network security**: Use HTTPS for all network requests

### Privacy

- **Data minimization**: Collect only necessary data
- **Consent management**: Implement proper consent flows
- **Data retention**: Implement proper data retention policies
- **Anonymization**: Anonymize data when possible

---

<div class="admonition tip" markdown="1">
**Pro Tip**: When troubleshooting, start with the simplest possible setup and gradually add complexity. This approach helps isolate the source of issues.
</div>

<div class="admonition note" markdown="1">
**Need More Help?** If you can't find the answer here, the Spezi community is very helpful! Don't hesitate to ask questions in [GitHub Discussions](https://github.com/orgs/StanfordSpezi/discussions).
</div> 