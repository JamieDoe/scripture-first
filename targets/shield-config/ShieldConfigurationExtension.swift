import ManagedSettings
import ManagedSettingsUI
import UIKit

class ShieldConfigurationExtension: ShieldConfigurationDataSource {

    override func configuration(shielding application: Application) -> ShieldConfiguration {
        ShieldConfiguration(
            backgroundBlurStyle: .systemMaterial,
            title: ShieldConfiguration.Label(text: "Scripture First", color: .label),
            subtitle: ShieldConfiguration.Label(text: "Spend a moment with God before opening this.", color: .secondaryLabel),
            primaryButtonLabel: ShieldConfiguration.Label(text: "Read Scripture", color: .white),
            primaryButtonBackgroundColor: .systemIndigo,
            secondaryButtonLabel: ShieldConfiguration.Label(text: "Not now", color: .secondaryLabel)
        )
    }

    override func configuration(shielding application: Application, in category: ActivityCategory) -> ShieldConfiguration {
        configuration(shielding: application)
    }

    override func configuration(shielding webDomain: WebDomain) -> ShieldConfiguration {
        ShieldConfiguration()
    }

    override func configuration(shielding webDomain: WebDomain, in category: ActivityCategory) -> ShieldConfiguration {
        ShieldConfiguration()
    }
}
