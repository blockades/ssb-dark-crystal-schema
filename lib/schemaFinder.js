const Validator = require('is-my-json-valid')
const getContent = require('ssb-msg-content')
const Schema = require('../schemas')

module.exports = (schemaName) => {
  return function schemaFinder (content) {
    if (!content.version) return false

    const schemaVersion = Schema(content.version)
    if (!schemaVersion) return false

    const schema = schemaVersion(schemaName)
    if (!schema) return false

    return schema
  }
}
