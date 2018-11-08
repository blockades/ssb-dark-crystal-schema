var v1 = require('./v1')
var v2 = require('./v2')

module.exports = {
  [v1.SCHEMA_VERSION]: v1,
  [v2.SCHEMA_VERSION]: v2
}
