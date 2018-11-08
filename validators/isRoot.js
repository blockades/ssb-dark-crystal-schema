const schemaFinder = require('../lib/schemaFinder')
const validator = require('../lib/validator')
const getContent = require('ssb-msg-content')

module.exports = function isRoot (msg, opts = {}) {
  const content = getContent(msg)
  var schema = schemaFinder('root')(content)
  if (!schema) {
    isRoot.errors = [{ field: 'data.version', message: 'is not present' }]
    return false
  }

  var validate = validator(schema)
  var result = validate(msg, opts = {})
  isRoot.errors = validate.errors
  return result
}
