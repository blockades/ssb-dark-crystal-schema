const Validator = require('is-my-json-valid')
const getContent = require('ssb-msg-content')

module.exports = function (schema) {
  const validator = Validator(schema, { verbose: true })

  return function validatorWithErrors (obj) {
    const result = validator(getContent(obj))

    // exposes error messages provided by is-my-json-valid
    validatorWithErrors.errors = validator.errors

    return result
  }
}
