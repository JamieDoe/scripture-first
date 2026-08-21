import ExpoModulesCore
import FamilyControls

public class ExpoScreenTimeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoScreenTime")

    Function("isAvailable") {
      if #available(iOS 16.0, *) { return true }
      return false
    }

    Function("getAuthorizationStatus") { () -> String in
      Self.statusString()
    }

    AsyncFunction("requestAuthorization") { () async throws -> String in
      guard #available(iOS 16.0, *) else { throw ScreenTimeError.unsupportedOS }
      try await AuthorizationCenter.shared.requestAuthorization(for: .individual)
      return Self.statusString()
    }
  }

  private static func statusString() -> String {
    guard #available(iOS 16.0, *) else { return "unsupported" }
    switch AuthorizationCenter.shared.authorizationStatus {
    case .notDetermined: return "notDetermined"
    case .denied:        return "denied"
    case .approved:      return "approved"
    @unknown default:    return "unknown"
    }
  }
}

enum ScreenTimeError: Error { case unsupportedOS }