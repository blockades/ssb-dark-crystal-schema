const versions = require('./schemas/versions')
const validators = require('./validators')
const SCHEMA_VERSION = require('./version')

module.exports = {
  ...validators,
  SCHEMA_VERSION
}
