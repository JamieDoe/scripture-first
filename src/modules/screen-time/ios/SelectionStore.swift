import FamilyControls
import Foundation

@available(iOS 16.0, *)
enum SelectionStore {
    private static let suiteName = "group.com.jamiedoe.scripturefirst"
    private static let key = "familyActivitySelection"
    private static let blockingKey = "isBlocking"

    private static var defaults: UserDefaults? {
        UserDefaults(suiteName: suiteName)
    }

    static func save(_ selection: FamilyActivitySelection) {
        guard let data = try? JSONEncoder().encode(selection) else { return }
        defaults?.set(data, forKey: key)
    }

    static func load() -> FamilyActivitySelection? {
        guard let data = defaults?.data(forKey: key) else { return nil }
        return try? JSONDecoder().decode(FamilyActivitySelection.self, from: data)
    }

    static func setBlocking(_ value: Bool) {
        defaults?.set(value, forKey: blockingKey)
    }

    static func isBlocking() -> Bool {
        defaults?.bool(forKey: blockingKey) ?? false
    }
}
