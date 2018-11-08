const schemaFinder = require('../lib/schemaFinder')
const validator = require('../lib/validator')
const getContent = require('ssb-msg-content')

module.exports = function isShard (msg) {
  const content = getContent(msg)
  var schema = schemaFinder('shard')(content)
  if (!schema) {
    isShard.errors = [{ field: 'version.name', message: 'is not present' }]
    return false
  }

  var validate = validator(schema)
  var result = validate(msg)
  isShard.errors = validate.errors
  return result
}
