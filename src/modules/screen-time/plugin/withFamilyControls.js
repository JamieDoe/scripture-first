const { withEntitlementsPlist } = require('@expo/config-plugins');

const withFamilyControls = (config) =>
  withEntitlementsPlist(config, (cfg) => {
    cfg.modResults['com.apple.developer.family-controls'] = true;
    return cfg;
  });

module.exports = withFamilyControls;
