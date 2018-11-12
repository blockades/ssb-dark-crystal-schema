const validators = require('./validators')
const { currentVersion }= require('./schemas')

module.exports = {
  ...validators,
  SCHEMA_VERSION: "1.0.0"
}
