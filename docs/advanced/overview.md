# Advanced Topics 🚀

Once you're comfortable with the basics of Spezi, these advanced topics will help you build more sophisticated, performant, and production-ready applications.

## Advanced Architecture Patterns

### 1. Multi-Standard Applications

For complex applications, you might need multiple standards to manage different domains:

```swift
import Spezi

// MARK: - Domain-Specific Standards
class HealthStandard: Standard, ObservableObject {
    @Published var healthData: [HealthData] = []
    
    init() {
        add(HealthKitModule())
        add(BluetoothModule())
    }
}

class UserStandard: Standard, ObservableObject {
    @Published var userProfile: UserProfile?
    
    init() {
        add(AccountModule())
        add(OnboardingModule())
    }
}

class ResearchStandard: Standard, ObservableObject {
    @Published var studyData: [StudyData] = []
    
    init() {
        add(QuestionnaireModule())
        add(FHIRModule())
    }
}

// MARK: - Application Coordinator
class AppCoordinator: ObservableObject {
    @Published var healthStandard = HealthStandard()
    @Published var userStandard = UserStandard()
    @Published var researchStandard = ResearchStandard()
    
    func configureStandards() {
        // Configure cross-standard communication
        healthStandard.spezi.publish(to: researchStandard.spezi)
        userStandard.spezi.publish(to: healthStandard.spezi)
    }
}
```

### 2. Module Dependency Injection

Advanced dependency injection patterns for complex module interactions:

```swift
import Spezi

// MARK: - Service Protocols
protocol DataService {
    func fetchData() async throws -> [Data]
}

protocol AnalyticsService {
    func trackEvent(_ event: AnalyticsEvent)
}

// MARK: - Service Implementations
class LocalDataService: DataService {
    func fetchData() async throws -> [Data] {
        // Local data implementation
    }
}

class RemoteDataService: DataService {
    func fetchData() async throws -> [Data] {
        // Remote data implementation
    }
}

// MARK: - Module with Dependency Injection
class AdvancedModule: Module {
    private let dataService: DataService
    private let analyticsService: AnalyticsService
    
    init(
        dataService: DataService,
        analyticsService: AnalyticsService
    ) {
        self.dataService = dataService
        self.analyticsService = analyticsService
    }
    
    func performOperation() async throws {
        let data = try await dataService.fetchData()
        analyticsService.trackEvent(.dataFetched(count: data.count))
    }
}
```

## Performance Optimization

### 1. Lazy Module Loading

Load modules only when needed to improve startup performance:

```swift
import Spezi

class OptimizedStandard: Standard, ObservableObject {
    private var loadedModules: [String: Module] = [:]
    
    func loadModuleIfNeeded<T: Module>(_ moduleType: T.Type) {
        let moduleName = String(describing: moduleType)
        
        guard loadedModules[moduleName] == nil else { return }
        
        let module = moduleType.init()
        loadedModules[moduleName] = module
        add(module)
    }
    
    func unloadModule<T: Module>(_ moduleType: T.Type) {
        let moduleName = String(describing: moduleType)
        loadedModules.removeValue(forKey: moduleName)
        // Remove module from standard
    }
}
```

### 2. Data Caching Strategies

Implement efficient data caching for better performance:

```swift
import Foundation

// MARK: - Cache Protocol
protocol Cache {
    func get<T: Codable>(_ key: String) -> T?
    func set<T: Codable>(_ value: T, for key: String)
    func clear()
}

// MARK: - Memory Cache
class MemoryCache: Cache {
    private var storage: [String: Any] = [:]
    private let queue = DispatchQueue(label: "cache.queue", attributes: .concurrent)
    
    func get<T: Codable>(_ key: String) -> T? {
        queue.sync {
            return storage[key] as? T
        }
    }
    
    func set<T: Codable>(_ value: T, for key: String) {
        queue.async(flags: .barrier) {
            self.storage[key] = value
        }
    }
    
    func clear() {
        queue.async(flags: .barrier) {
            self.storage.removeAll()
        }
    }
}

// MARK: - Cached Module
class CachedDataModule: Module {
    private let cache: Cache
    private let dataService: DataService
    
    init(cache: Cache, dataService: DataService) {
        self.cache = cache
        self.dataService = dataService
    }
    
    func getData() async throws -> [Data] {
        // Check cache first
        if let cached: [Data] = cache.get("data") {
            return cached
        }
        
        // Fetch from service
        let data = try await dataService.fetchData()
        
        // Cache the result
        cache.set(data, for: "data")
        
        return data
    }
}
```

### 3. Background Processing

Handle background tasks efficiently:

```swift
import Foundation
import Spezi

class BackgroundProcessingModule: Module {
    private var backgroundTasks: [String: Task<Void, Never>] = [:]
    
    func startBackgroundTask(id: String, operation: @escaping () async -> Void) {
        // Cancel existing task if any
        backgroundTasks[id]?.cancel()
        
        // Start new background task
        backgroundTasks[id] = Task {
            await operation()
        }
    }
    
    func stopBackgroundTask(id: String) {
        backgroundTasks[id]?.cancel()
        backgroundTasks.removeValue(forKey: id)
    }
    
    func willTerminate() {
        // Cancel all background tasks
        backgroundTasks.values.forEach { $0.cancel() }
        backgroundTasks.removeAll()
    }
}
```

## Advanced Data Flow

### 1. Event-Driven Architecture

Implement event-driven patterns for loose coupling:

```swift
import Foundation
import Spezi

// MARK: - Event System
protocol Event {
    var id: UUID { get }
    var timestamp: Date { get }
}

struct DataUpdatedEvent: Event {
    let id = UUID()
    let timestamp = Date()
    let dataType: String
    let data: Any
}

struct UserActionEvent: Event {
    let id = UUID()
    let timestamp = Date()
    let action: String
    let parameters: [String: Any]
}

// MARK: - Event Bus
class EventBus: ObservableObject {
    private var subscribers: [String: [EventSubscriber]] = [:]
    
    func subscribe<T: Event>(to eventType: T.Type, subscriber: EventSubscriber) {
        let key = String(describing: eventType)
        subscribers[key, default: []].append(subscriber)
    }
    
    func publish<T: Event>(_ event: T) {
        let key = String(describing: T.self)
        subscribers[key]?.forEach { subscriber in
            subscriber.handle(event)
        }
    }
}

protocol EventSubscriber {
    func handle<T: Event>(_ event: T)
}

// MARK: - Event-Driven Module
class EventDrivenModule: Module, EventSubscriber {
    private let eventBus: EventBus
    
    init(eventBus: EventBus) {
        self.eventBus = eventBus
        eventBus.subscribe(to: DataUpdatedEvent.self, subscriber: self)
    }
    
    func handle<T: Event>(_ event: T) {
        if let dataEvent = event as? DataUpdatedEvent {
            handleDataUpdate(dataEvent)
        }
    }
    
    private func handleDataUpdate(_ event: DataUpdatedEvent) {
        // Handle data update event
    }
}
```

### 2. Reactive Data Binding

Implement reactive data binding patterns:

```swift
import Combine
import Spezi

// MARK: - Reactive Module
class ReactiveModule: Module, ObservableObject {
    @Published var data: [Data] = []
    @Published var isLoading = false
    @Published var error: Error?
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        setupBindings()
    }
    
    private func setupBindings() {
        // React to data changes
        $data
            .sink { [weak self] data in
                self?.handleDataChange(data)
            }
            .store(in: &cancellables)
        
        // React to loading state
        $isLoading
            .sink { [weak self] loading in
                self?.handleLoadingChange(loading)
            }
            .store(in: &cancellables)
    }
    
    private func handleDataChange(_ data: [Data]) {
        // Handle data changes
    }
    
    private func handleLoadingChange(_ loading: Bool) {
        // Handle loading state changes
    }
}
```

## Security and Privacy

### 1. Data Encryption

Implement data encryption for sensitive information:

```swift
import CryptoKit
import Foundation

// MARK: - Encryption Service
protocol EncryptionService {
    func encrypt(_ data: Data) throws -> Data
    func decrypt(_ data: Data) throws -> Data
}

class AESEncryptionService: EncryptionService {
    private let key: SymmetricKey
    
    init(key: SymmetricKey) {
        self.key = key
    }
    
    func encrypt(_ data: Data) throws -> Data {
        let sealedBox = try AES.GCM.seal(data, using: key)
        return sealedBox.combined ?? Data()
    }
    
    func decrypt(_ data: Data) throws -> Data {
        let sealedBox = try AES.GCM.SealedBox(combined: data)
        return try AES.GCM.open(sealedBox, using: key)
    }
}

// MARK: - Secure Module
class SecureDataModule: Module {
    private let encryptionService: EncryptionService
    
    init(encryptionService: EncryptionService) {
        self.encryptionService = encryptionService
    }
    
    func storeSecureData(_ data: Data) throws {
        let encryptedData = try encryptionService.encrypt(data)
        // Store encrypted data
    }
    
    func retrieveSecureData() throws -> Data {
        // Retrieve encrypted data
        let encryptedData = Data() // Get from storage
        return try encryptionService.decrypt(encryptedData)
    }
}
```

### 2. Privacy Compliance

Implement privacy compliance features:

```swift
import Foundation

// MARK: - Privacy Manager
class PrivacyManager: ObservableObject {
    @Published var consentStatus: ConsentStatus = .notGiven
    @Published var dataRetentionDays: Int = 30
    
    enum ConsentStatus {
        case notGiven
        case given
        case withdrawn
    }
    
    func requestConsent() async -> Bool {
        // Request user consent
        return true
    }
    
    func withdrawConsent() {
        consentStatus = .withdrawn
        // Handle data deletion
    }
    
    func cleanupExpiredData() {
        // Remove data older than retention period
    }
}

// MARK: - Privacy-Compliant Module
class PrivacyCompliantModule: Module {
    private let privacyManager: PrivacyManager
    
    init(privacyManager: PrivacyManager) {
        self.privacyManager = privacyManager
    }
    
    func collectData() async throws {
        guard privacyManager.consentStatus == .given else {
            throw PrivacyError.consentRequired
        }
        
        // Collect data only with consent
    }
    
    func deleteUserData() {
        // Delete all user data
    }
}

enum PrivacyError: LocalizedError {
    case consentRequired
    
    var errorDescription: String? {
        switch self {
        case .consentRequired:
            return "User consent is required to collect data"
        }
    }
}
```

## Testing Advanced Features

### 1. Integration Testing

Test complex module interactions:

```swift
import XCTest
import Spezi
@testable import YourApp

class IntegrationTests: XCTestCase {
    var standard: TestStandard!
    var healthModule: HealthModule!
    var accountModule: AccountModule!
    
    override func setUp() {
        super.setUp()
        standard = TestStandard()
        healthModule = HealthModule()
        accountModule = AccountModule()
        
        standard.add(healthModule)
        standard.add(accountModule)
    }
    
    func testModuleCommunication() async throws {
        // Test data flow between modules
        let testData = HealthData(steps: 10000)
        healthModule.publishData(testData)
        
        // Verify account module received the data
        let receivedData = await accountModule.getLatestHealthData()
        XCTAssertEqual(receivedData?.steps, 10000)
    }
    
    func testErrorHandling() async {
        // Test error propagation between modules
        healthModule.simulateError(HealthError.permissionDenied)
        
        // Verify error is handled properly
        XCTAssertTrue(accountModule.hasReceivedError)
    }
}
```

### 2. Performance Testing

Test module performance:

```swift
import XCTest
import Spezi

class PerformanceTests: XCTestCase {
    func testModuleInitializationPerformance() {
        measure {
            let standard = TestStandard()
            standard.add(HealthModule())
            standard.add(AccountModule())
            standard.add(QuestionnaireModule())
        }
    }
    
    func testDataProcessingPerformance() async throws {
        let module = PerformanceTestModule()
        
        measure {
            // Measure data processing performance
            Task {
                try await module.processLargeDataset()
            }
        }
    }
}
```

## Deployment and Monitoring

### 1. Feature Flags

Implement feature flags for gradual rollouts:

```swift
import Foundation

// MARK: - Feature Flag Manager
class FeatureFlagManager: ObservableObject {
    @Published var flags: [String: Bool] = [:]
    
    func isEnabled(_ flag: String) -> Bool {
        return flags[flag] ?? false
    }
    
    func updateFlags(_ newFlags: [String: Bool]) {
        flags = newFlags
    }
}

// MARK: - Feature-Flagged Module
class FeatureFlaggedModule: Module {
    private let featureManager: FeatureFlagManager
    
    init(featureManager: FeatureFlagManager) {
        self.featureManager = featureManager
    }
    
    func performFeature() {
        guard featureManager.isEnabled("new_feature") else {
            // Use old implementation
            return
        }
        
        // Use new implementation
    }
}
```

### 2. Analytics and Monitoring

Implement comprehensive analytics:

```swift
import Foundation

// MARK: - Analytics Service
protocol AnalyticsService {
    func trackEvent(_ event: AnalyticsEvent)
    func trackError(_ error: Error)
    func trackPerformance(_ metric: PerformanceMetric)
}

struct AnalyticsEvent {
    let name: String
    let parameters: [String: Any]
    let timestamp: Date
}

struct PerformanceMetric {
    let name: String
    let value: Double
    let unit: String
}

// MARK: - Monitored Module
class MonitoredModule: Module {
    private let analytics: AnalyticsService
    
    init(analytics: AnalyticsService) {
        self.analytics = analytics
    }
    
    func performOperation() async throws {
        let startTime = Date()
        
        defer {
            let duration = Date().timeIntervalSince(startTime)
            analytics.trackPerformance(PerformanceMetric(
                name: "operation_duration",
                value: duration,
                unit: "seconds"
            ))
        }
        
        do {
            // Perform operation
            analytics.trackEvent(AnalyticsEvent(
                name: "operation_success",
                parameters: [:],
                timestamp: Date()
            ))
        } catch {
            analytics.trackError(error)
            throw error
        }
    }
}
```

## Next Steps

Explore these advanced topics further:

- **[Performance Optimization](performance.md)**: Deep dive into optimization techniques
- **[Security Best Practices](security.md)**: Advanced security patterns
- **[Testing Strategies](testing.md)**: Comprehensive testing approaches
- **[Production Deployment](deployment.md)**: Production-ready deployment strategies

---

<div class="admonition tip" markdown="1">
**Pro Tip**: Advanced features should be implemented incrementally. Start with the basics and add complexity only when needed. This approach ensures your application remains maintainable and performant.
</div> 