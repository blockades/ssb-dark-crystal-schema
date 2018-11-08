const getContent = require('ssb-msg-content')

module.exports = function validatorWithErrors (obj, opts = {}) {
  const content = getContent(obj)
  const result = validator(content)

  // exposes error messages provided by is-my-json-valid
  validatorWithErrors.errors = validator.errors
  if (opts.attachErrors) obj.errors = validator.errors

  return result
}
