module.exports = (config) => ({
  type: 'shield-config',
  bundleIdentifier: 'com.jamiedoe.scripturefirst.ShieldConfig',
  entitlements: {
    'com.apple.developer.family-controls': true,
    'com.apple.security.application-groups': ['group.com.jamiedoe.scripturefirst'],
  },
});
