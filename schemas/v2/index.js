const ritual = require('./ritual')
const root = require('./root')
const shard = require('./shard')

module.exports = {
  SCHEMA_VERSION: require('./version'),
  getSchema: (schemaName) => {
    let schemas = { ritual, root, shard }
    return schemas[schemaName]
  }
}
