const ritual = require('./ritual')
const root = require('./root')
const shard = require('./shard')

module.exports = (schemaName) => {
  var schemas = {
    ritual,
    root,
    shard
  }

  return schemas[schemaName]
}
