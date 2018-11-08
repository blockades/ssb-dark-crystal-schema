const schemaFinder = require('../lib/schemaFinder')

module.exports = (msg) => {
  var schema = schemaFinder('ritual')
  return schema(msg)
}
