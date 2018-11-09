const findSchemaByName = require('../lib/schemaFinder')
const validator = require('../lib/validator')
const getContent = require('ssb-msg-content')

module.exports = function isForward (msg, opts = {}) {
  isForward.errors = []
  const content = getContent(msg)
  var findSchemaByVersion = findSchemaByName('forward')
  var schema = findSchemaByVersion(content)

  if (!schema) {
    isForward.errors = isForward.errors.concat(findSchemaByVersion.errors)
    if (opts.attachErrors) msg.errors = isForward.errors
    return false
  } else {
    var validate = validator(schema)
    var result = validate(msg, opts)
    isForward.errors = validate.errors
    return result
  }
}
