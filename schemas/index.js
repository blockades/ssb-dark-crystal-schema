const V1_SCHEMA_VERSION = require('./v1/version')
const V2_SCHEMA_VERSION = require('./v2/version')

module.exports = {
  versions: {
    "1.0.0": require('./v1'),
    "2.0.0": require('./v2')
  },
  currentVersion: () => V1_SCHEMA_VERSION
}
