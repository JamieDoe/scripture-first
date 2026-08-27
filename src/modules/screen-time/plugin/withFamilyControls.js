const { withEntitlementsPlist } = require('@expo/config-plugins');

const withFamilyControls = (config) =>
  withEntitlementsPlist(config, (cfg) => {
    cfg.modResults['com.apple.developer.family-controls'] = true;
    cfg.modResults['com.apple.security.application-groups'] = ['group.com.jamiedoe.scripturefirst'];
    return cfg;
  });

module.exports = withFamilyControls;
