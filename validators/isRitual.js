const schemaFinder = require('../lib/schemaFinder')
const validator = require('../lib/validator')
const getContent = require('ssb-msg-content')

module.exports = function isRitual (msg, opts = {}) {
  const content = getContent(msg)
  var schema = schemaFinder('ritual')(content)
  if (!schema) {
    isRitual.errors = [{ field: 'data.version', message: 'is not present' }]
    return false
  }

  var validate = validator(schema)
  var result = validate(msg, opts)
  isRitual.errors = validate.errors
  return result
}
