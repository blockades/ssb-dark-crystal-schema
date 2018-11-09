const Validator = require('is-my-json-valid')
const getContent = require('ssb-msg-content')
const schemas = require('../schemas')

module.exports = function findSchemaByName (schemaName) {
  return function findSchemaByVersion (content) {
    if (!content.version) {
      findSchemaByVersion.errors = [{
        field: 'data.version',
        message: 'is not provided'
      }]
      return false
    }

    const schemaVersion = schemas.versions[content.version]
    if (!schemaVersion) {
      findSchemaByVersion.errors = [{
        field: 'data.version',
        message: 'is not a valid version',
        value: content.version,
        type: typeof content.version
      }]
      return false
    }

    const schema = schemaVersion.getSchema(schemaName)
    if (!schema) {
      findSchemaByVersion.errors = [{
        field: 'data.schema',
        message: `${schemaName} is not a valid schema`,
        value: schemaName,
        type: typeof schemaName
      }]
      return false
    }

    return schema
  }
}
