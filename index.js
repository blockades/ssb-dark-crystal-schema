const validators = require('./validators')
const errorParser = require('./lib/errorParser')

module.exports = Object.assign(
  {
    SCHEMA_VERSION: '2.0.0', // current schema version
    errorParser
  },
  validators
)
