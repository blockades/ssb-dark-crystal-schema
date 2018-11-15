const validate = require('ssb-schema-validation')
const schemas = require('../schemas')

module.exports = {
  isRitual: validate(schemas).with('ritual'),
  isRoot: validate(schemas).with('root'),
  isShard: validate(schemas).with('shard'),
  isForward: validate(schemas).with('forward')
}
