const ritual = require('./ritual')
const root = require('./root')
const shard = require('./shard')
const forward = require('./forward')

module.exports = {
  SCHEMA_VERSION: require('./version'),
  getSchema: (schemaName) => {
    let schemas = { ritual, root, shard, forward }
    return schemas[schemaName]
  }
}
