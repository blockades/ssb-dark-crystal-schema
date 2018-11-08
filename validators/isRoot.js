const schemaFinder = require('../lib/schemaFinder')
const validator = require('../lib/validator')
const getContent = require('ssb-msg-content')

module.exports = function isRoot (msg) {
  const content = getContent(msg)
  var schema = schemaFinder('root')(content)
  if (!schema) {
    isRoot.errors = [{ field: 'version.name', message: 'is not present' }]
    return false
  }

  var validate = validator(schema)
  var result = validate(msg)
  isRoot.errors = validate.errors
  return result
}
