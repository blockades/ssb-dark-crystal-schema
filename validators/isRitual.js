const findSchemaByName = require('../lib/schemaFinder')
const validator = require('../lib/validator')
const getContent = require('ssb-msg-content')

module.exports = function isRitual (msg, opts = {}) {
  isRitual.errors = []
  const content = getContent(msg)
  var findSchemaByVersion = findSchemaByName('ritual')
  var schema = findSchemaByVersion(content)

  if (!schema) {
    isRitual.errors = isRitual.errors.concat(findSchemaByVersion.errors)
    if (opts.attachErrors) msg.errors = isRitual.errors
    return false
  } else {
    var validate = validator(schema)
    var result = validate(msg, opts)
    isRitual.errors = validate.errors
    return result
  }
}
