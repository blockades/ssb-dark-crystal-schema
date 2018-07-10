const validator = require('is-my-json-valid')
const getContent = require('ssb-msg-content')

module.exports = function (schema) {
  const validate = validator(schema, { verbose: true })

  return function (obj) {
    var result = validate(getContent(obj))
    if (validate.errors) obj.errors = validate.errors
    return result
  }
}
