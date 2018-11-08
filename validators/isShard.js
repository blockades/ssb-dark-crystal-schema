const schemaFinder = require('../lib/schemaFinder')
const validator = require('../lib/validator')
const getContent = require('ssb-msg-content')

module.exports = function isShard (msg, opts = {}) {
  const content = getContent(msg)
  var schema = schemaFinder('shard')(content)
  if (!schema) {
    isShard.errors = [{ field: 'data.version', message: 'is not present' }]
    return false
  }

  var validate = validator(schema)
  var result = validate(msg, opts = {})
  isShard.errors = validate.errors
  return result
}
