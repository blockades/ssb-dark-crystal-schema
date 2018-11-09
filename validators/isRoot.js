const findSchemaByName = require('../lib/schemaFinder')
const validator = require('../lib/validator')
const getContent = require('ssb-msg-content')

module.exports = function isRoot (msg, opts = {}) {
  isRoot.errors = []
  const content = getContent(msg)
  var findSchemaByVersion = findSchemaByName('root')
  var schema = findSchemaByVersion(content)

  if (!schema) {
    isRoot.errors = isRoot.errors.concat(findSchemaByVersion.errors)
    if (opts.attachErrors) msg.errors = isRoot.errors
    return false
  } else {
    var validate = validator(schema)
    var result = validate(msg, opts)
    isRoot.errors = validate.errors
    return result
  }
}
