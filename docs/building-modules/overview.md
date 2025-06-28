# Building Custom Modules 🛠️

Creating your own Spezi modules allows you to extend the framework with custom functionality and contribute to the ecosystem. This guide covers everything you need to know to build, test, and publish your modules.

## Module Development Overview

A Spezi module is a Swift Package that provides specific functionality and integrates with the Spezi framework. Modules can range from simple utilities to complex systems with their own UI components.

## Module Structure

A typical Spezi module follows this structure:

```
MyModule/
├── Package.swift
├── Sources/
│   └── MyModule/
│       ├── MyModule.swift
│       ├── Views/
│       │   └── MyModuleView.swift
│       ├── Models/
│       │   └── MyModuleData.swift
│       └── Resources/
│           └── Assets.xcassets
├── Tests/
│   └── MyModuleTests/
│       └── MyModuleTests.swift
└── README.md
```

## Step 1: Create a New Swift Package

1. **Create the Package Structure:**
```bash
mkdir MyModule
cd MyModule
swift package init --type library
```

2. **Update Package.swift:**
```swift
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyModule",
    platforms: [
        .iOS(.v16),
        .macOS(.v13)
    ],
    products: [
        .library(
            name: "MyModule",
            targets: ["MyModule"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/StanfordSpezi/Spezi", from: "0.8.0"),
        .package(url: "https://github.com/StanfordSpezi/SpeziViews", from: "0.8.0")
    ],
    targets: [
        .target(
            name: "MyModule",
            dependencies: [
                .product(name: "Spezi", package: "Spezi"),
                .product(name: "SpeziViews", package: "SpeziViews")
            ]
        ),
        .testTarget(
            name: "MyModuleTests",
            dependencies: ["MyModule"]
        )
    ]
)
```

## Step 2: Define Your Module

Create the main module file:

```swift
import Foundation
import Spezi
import SpeziViews

// MARK: - Module Definition
public struct MyModule: Module {
    public static let name = "MyModule"
    public static let version = "1.0.0"
    
    // Module configuration
    private let configuration: MyModuleConfiguration
    
    public init(configuration: MyModuleConfiguration = .default) {
        self.configuration = configuration
    }
    
    // MARK: - Module Lifecycle
    public func configure() {
        // Called when the module is first configured
        print("MyModule configured with: \(configuration)")
    }
    
    public func willLaunch() {
        // Called before the app launches
    }
    
    public func didLaunch() {
        // Called after the app launches
    }
    
    public func willTerminate() {
        // Called before the app terminates
    }
}

// MARK: - Module Configuration
public struct MyModuleConfiguration {
    public let featureEnabled: Bool
    public let maxRetries: Int
    
    public init(featureEnabled: Bool = true, maxRetries: Int = 3) {
        self.featureEnabled = featureEnabled
        self.maxRetries = maxRetries
    }
    
    public static let `default` = MyModuleConfiguration()
}
```

## Step 3: Define Module Requirements

Modules can specify requirements that must be met by the Standard or other modules:

```swift
import Spezi

// MARK: - Module Requirements
public protocol MyModuleRequirement: Requirement {
    func performRequiredAction() async throws
}

// MARK: - Module with Requirements
public struct MyAdvancedModule: Module {
    @Requirement(MyModuleRequirement.self)
    private var requirement: MyModuleRequirement
    
    public init() {}
    
    public func configure() {
        // The requirement will be automatically injected
        // if a module providing MyModuleRequirement is available
    }
    
    public func performAction() async throws {
        try await requirement.performRequiredAction()
    }
}
```

## Step 4: Create Module Views

Modules often provide SwiftUI views for user interaction:

```swift
import SwiftUI
import SpeziViews

// MARK: - Module Views
public struct MyModuleView: View {
    @StateObject private var viewModel = MyModuleViewModel()
    
    public init() {}
    
    public var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "star.fill")
                .font(.system(size: 50))
                .foregroundColor(.yellow)
            
            Text("My Module")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("This is a custom Spezi module")
                .font(.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
            
            SpeziButton("Perform Action") {
                Task {
                    await viewModel.performAction()
                }
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

// MARK: - View Model
@MainActor
class MyModuleViewModel: ObservableObject {
    @Published var isLoading = false
    @Published var result: String?
    
    func performAction() async {
        isLoading = true
        defer { isLoading = false }
        
        // Perform your module's main functionality
        do {
            result = try await performModuleAction()
        } catch {
            result = "Error: \(error.localizedDescription)"
        }
    }
    
    private func performModuleAction() async throws -> String {
        // Simulate some work
        try await Task.sleep(nanoseconds: 1_000_000_000)
        return "Action completed successfully!"
    }
}

#Preview {
    MyModuleView()
}
```

## Step 5: Define Data Models

Modules often define data structures for their functionality:

```swift
import Foundation

// MARK: - Data Models
public struct MyModuleData: Codable, Identifiable {
    public let id: UUID
    public let title: String
    public let description: String
    public let timestamp: Date
    public let metadata: [String: String]
    
    public init(
        id: UUID = UUID(),
        title: String,
        description: String,
        timestamp: Date = Date(),
        metadata: [String: String] = [:]
    ) {
        self.id = id
        self.title = title
        self.description = description
        self.timestamp = timestamp
        self.metadata = metadata
    }
}

// MARK: - Module Events
public enum MyModuleEvent {
    case dataCreated(MyModuleData)
    case dataUpdated(MyModuleData)
    case dataDeleted(UUID)
    case error(Error)
}
```

## Step 6: Implement Module Communication

Modules can communicate with each other through the Standard:

```swift
import Spezi

// MARK: - Module Communication
extension MyModule {
    public func publishData(_ data: MyModuleData) {
        // Publish data to other modules
        spezi.publish(data)
    }
    
    public func subscribeToData() {
        // Subscribe to data from other modules
        spezi.subscribe(to: MyModuleData.self) { data in
            // Handle incoming data
            print("Received data: \(data)")
        }
    }
    
    public func requestData() async throws -> [MyModuleData] {
        // Request data from other modules
        return try await spezi.request(MyModuleData.self)
    }
}
```

## Step 7: Add Module Constraints

Modules can enforce constraints on the Standard:

```swift
import Spezi

// MARK: - Module Constraints
extension MyModule {
    public func configureConstraints() {
        // Require specific permissions
        spezi.require(.healthKit)
        spezi.require(.notifications)
        
        // Require other modules
        spezi.require(AccountModule.self)
        spezi.require(OnboardingModule.self)
    }
}
```

## Step 8: Create Module Tests

Comprehensive testing is essential for module quality:

```swift
import XCTest
import Spezi
@testable import MyModule

final class MyModuleTests: XCTestCase {
    var module: MyModule!
    var standard: TestStandard!
    
    override func setUp() {
        super.setUp()
        module = MyModule()
        standard = TestStandard()
    }
    
    override func tearDown() {
        module = nil
        standard = nil
        super.tearDown()
    }
    
    func testModuleConfiguration() {
        // Test module configuration
        XCTAssertNotNil(module)
    }
    
    func testModuleLifecycle() {
        // Test module lifecycle methods
        module.configure()
        module.willLaunch()
        module.didLaunch()
        module.willTerminate()
    }
    
    func testDataPublishing() async {
        // Test data publishing
        let testData = MyModuleData(
            title: "Test",
            description: "Test description"
        )
        
        module.publishData(testData)
        // Add assertions for data publishing
    }
}

// MARK: - Test Standard
class TestStandard: Standard, ObservableObject {
    // Minimal implementation for testing
}
```

## Step 9: Document Your Module

Create comprehensive documentation:

```markdown
# MyModule

A custom Spezi module that provides [describe functionality].

## Features

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Installation

Add the package to your Xcode project:

```swift
.package(url: "https://github.com/yourusername/MyModule", from: "1.0.0")
```

## Usage

```swift
import MyModule

class MyStandard: Standard {
    init() {
        add(MyModule())
    }
}
```

## Requirements

- iOS 16.0+
- macOS 13.0+
- Spezi 0.8.0+

## License

MIT License
```

## Step 10: Publish Your Module

1. **Create a GitHub Repository:**
   - Push your module to GitHub
   - Add proper documentation
   - Include examples and tests

2. **Add to Swift Package Index:**
   - Your module will automatically appear on [Swift Package Index](https://swiftpackageindex.com)
   - Add proper metadata and documentation

3. **Share with the Community:**
   - Announce your module in [GitHub Discussions](https://github.com/orgs/StanfordSpezi/discussions)
   - Add it to the [Spezi ecosystem documentation](https://swiftpackageindex.com/StanfordSpezi)

## Best Practices

### 1. Module Design
- **Single Responsibility**: Each module should have one clear purpose
- **Reusability**: Design modules to be used across different applications
- **Configurability**: Provide configuration options for different use cases
- **Documentation**: Document all public APIs and provide examples

### 2. Error Handling
```swift
public enum MyModuleError: LocalizedError {
    case configurationError(String)
    case networkError(Error)
    case dataError(String)
    
    public var errorDescription: String? {
        switch self {
        case .configurationError(let message):
            return "Configuration error: \(message)"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        case .dataError(let message):
            return "Data error: \(message)"
        }
    }
}
```

### 3. Performance Considerations
- Use lazy loading for heavy resources
- Implement proper memory management
- Cache frequently accessed data
- Profile your module for performance issues

### 4. Testing Strategy
- Unit tests for all public APIs
- Integration tests with other modules
- Performance tests for critical paths
- UI tests for SwiftUI components

## Example: Complete Module

Here's a complete example of a simple module:

```swift
import Foundation
import Spezi
import SpeziViews
import SwiftUI

// MARK: - Weather Module
public struct WeatherModule: Module {
    public static let name = "WeatherModule"
    public static let version = "1.0.0"
    
    private let apiKey: String
    
    public init(apiKey: String) {
        self.apiKey = apiKey
    }
    
    public func configure() {
        // Configure weather service
    }
    
    public func getWeather(for location: String) async throws -> WeatherData {
        // Fetch weather data
        return WeatherData(temperature: 72, condition: "Sunny")
    }
}

// MARK: - Weather Data
public struct WeatherData: Codable {
    public let temperature: Double
    public let condition: String
}

// MARK: - Weather View
public struct WeatherView: View {
    @StateObject private var viewModel = WeatherViewModel()
    
    public init() {}
    
    public var body: some View {
        VStack {
            Text("\(Int(viewModel.temperature))°F")
                .font(.largeTitle)
            Text(viewModel.condition)
                .font(.title2)
        }
        .onAppear {
            Task {
                await viewModel.loadWeather()
            }
        }
    }
}

@MainActor
class WeatherViewModel: ObservableObject {
    @Published var temperature: Double = 0
    @Published var condition: String = ""
    
    func loadWeather() async {
        // Load weather data
    }
}
```

## Next Steps

Now that you understand module development, explore:

- **[Advanced Module Features](advanced-modules.md)**: Learn about advanced module capabilities
- **[Module Testing](testing-modules.md)**: Comprehensive testing strategies
- **[Module Publishing](publishing-modules.md)**: How to publish and maintain modules

---

<div class="admonition tip" markdown="1">
**Pro Tip**: Start with a simple module that solves a specific problem. As you gain experience, you can build more complex modules with advanced features and better integration.
</div> 