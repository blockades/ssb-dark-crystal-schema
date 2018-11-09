const findSchemaByName = require('../lib/schemaFinder')
const validator = require('../lib/validator')
const getContent = require('ssb-msg-content')

module.exports = function isShard (msg, opts = {}) {
  isShard.errors = []
  const content = getContent(msg)
  var findSchemaByVersion = findSchemaByName('shard')
  var schema = findSchemaByVersion(content)

  if (!schema) {
    isShard.errors = isShard.errors.concat(findSchemaByVersion.errors)
    if (opts.attachErrors) msg.errors = isShard.errors
    return false
  } else {
    var validate = validator(schema)
    var result = validate(msg, opts)
    isShard.errors = validate.errors
    return result
  }
}
