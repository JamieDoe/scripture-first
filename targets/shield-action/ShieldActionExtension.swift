import ManagedSettings
import Foundation

class ShieldActionExtension: ShieldActionDelegate {

    private func respond(_ action: ShieldAction, _ completionHandler: @escaping (ShieldActionResponse) -> Void) {
        switch action {
        case .primaryButtonPressed:      // "Read Scripture"
            let d = UserDefaults(suiteName: "group.com.jamiedoe.scripturefirst")
            d?.set(true, forKey: "pendingReadSession")
            if #available(iOS 26.5, *) {
                completionHandler(.openParentalControlsApp)   // opens your app
            } else {
                completionHandler(.defer)                     // older iOS: no-op for now
            }
        case .secondaryButtonPressed:    // "Not now"
            completionHandler(.close)
        @unknown default:
            completionHandler(.none)
        }
    }

    override func handle(action: ShieldAction, for application: ApplicationToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        respond(action, completionHandler)
    }

    override func handle(action: ShieldAction, for webDomain: WebDomainToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        respond(action, completionHandler)
    }

    override func handle(action: ShieldAction, for category: ActivityCategoryToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
        respond(action, completionHandler)
    }
}