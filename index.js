const validators = require('./validators')
const { currentVersion }= require('./schemas')

module.exports = {
  ...validators,
  SCHEMA_VERSION: currentVersion()
}
