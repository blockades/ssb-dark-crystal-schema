const validators = require('./validators')

module.exports = Object.assign(
  { SCHEMA_VERSION: '1.0.0' }, // current schema version
  validators
)
