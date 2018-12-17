const Validator = require('ssb-schema-validation')
const errorParser = require('./lib/errorParser')
const schemas = require('./schemas')

module.exports = {
  isRoot: Validator(schemas.root),
  isRitual: Validator(schemas.ritual),
  isShard: Validator(schemas.shard),
  isForward: Validator(schemas.forward),
  errorParser
}
