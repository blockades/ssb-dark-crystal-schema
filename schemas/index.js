const V1_SCHEMA_VERSION = require('./v1/version')
const V2_SCHEMA_VERSION = require('./v2/version')

module.exports = {
  [V1_SCHEMA_VERSION]: require('./v1'),
  [V2_SCHEMA_VERSION]: require('./v2')
}
