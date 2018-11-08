const validator = require('./validator')
const getContent = require('ssb-msg-content')
const Schema = require('../schemas')

module.exports = (schemaName) => {
  return (msg) => {
    const content = getContent(msg)
    if (!content.version) return validatorWithErrors(msg)

    const schemaVersion = Schema(content.version)
    if (!schemaVersion) return validatorWithErrors(msg)

    const schema = schemaVersion(schemaName)

    if (!schema) return validatorWithErrors(msg)

    return validator(schema)(msg)
  }
}
