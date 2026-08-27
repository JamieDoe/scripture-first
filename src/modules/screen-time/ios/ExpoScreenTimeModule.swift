import ExpoModulesCore
import FamilyControls
import SwiftUI
import UIKit
import ManagedSettings

public class ExpoScreenTimeModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoScreenTime")

        Function("isAvailable") {
            if #available(iOS 16.0, *) {
                return true
            }
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

        AsyncFunction("selectApps") { (promise: Promise) in
            DispatchQueue.main.async {
                guard #available(iOS 16.0, *) else {
                    promise.reject("UNSUPPORTED", "Family Controls requires iOS 16+"); return
                }
                guard let presenter = Self.topViewController() else {
                    promise.reject("NO_PRESENTER", "No screen to present from"); return
                }

                let initial = SelectionStore.load() ?? FamilyActivitySelection()
                let picker = AppPickerView(
                    initial: initial,
                    onDone: { selection in
                        SelectionStore.save(selection)

                        if SelectionStore.isBlocking() {
                            Self.applyShield()
                        }
                        presenter.dismiss(animated: true)
                        promise.resolve([
                            "applicationCount": selection.applicationTokens.count,
                            "categoryCount": selection.categoryTokens.count,
                        ])
                    },
                    onCancel: {
                        presenter.dismiss(animated: true)
                        promise.resolve(nil)
                    }
                )
                presenter.present(UIHostingController(rootView: picker), animated: true)
            }
        }

        Function("getSelectionSummary") { () -> [String: Int]? in
            guard #available(iOS 16.0, *), let selection = SelectionStore.load() else { return nil }
            return [
                "applicationCount": selection.applicationTokens.count,
                "categoryCount": selection.categoryTokens.count,
            ]
        }

        Function("startBlocking") { () -> Bool in
            guard #available(iOS 16.0, *), let selection = SelectionStore.load(),
                  !(selection.applicationTokens.isEmpty && selection.categoryTokens.isEmpty)
            else { return false }
            Self.applyShield()
            SelectionStore.setBlocking(true)
            return true
        }

        Function("stopBlocking") {
            if #available(iOS 16.0, *) {
                Self.clearShield()
                SelectionStore.setBlocking(false)
            }
        }

        Function("isBlocking") { () -> Bool in
            guard #available(iOS 16.0, *) else { return false }
            return SelectionStore.isBlocking()
        }
    }

    private static func statusString() -> String {
        guard #available(iOS 16.0, *) else { return "unsupported" }
        switch AuthorizationCenter.shared.authorizationStatus {
        case .notDetermined: return "notDetermined"
        case .denied: return "denied"
        case .approved: return "approved"
        @unknown default: return "unknown"
        }
    }

    @available(iOS 16.0, *)
    private static func applyShield() {
        let store = ManagedSettingsStore()
        guard let selection = SelectionStore.load() else {
            store.shield.applications = nil
            store.shield.applicationCategories = nil
            return
        }
        store.shield.applications =
            selection.applicationTokens.isEmpty ? nil : selection.applicationTokens
        if selection.categoryTokens.isEmpty {
            store.shield.applicationCategories = nil
        } else {
            store.shield.applicationCategories = .specific(selection.categoryTokens)
        }
    }

    @available(iOS 16.0, *)
    private static func clearShield() {
        let store = ManagedSettingsStore()
        store.shield.applications = nil
        store.shield.applicationCategories = nil
    }

    private static func topViewController() -> UIViewController? {
        let keyWindow = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }
        var top = keyWindow?.rootViewController
        while let presented = top?.presentedViewController {
            top = presented
        }
        return top
    }
}

enum ScreenTimeError: Error { case unsupportedOS }
