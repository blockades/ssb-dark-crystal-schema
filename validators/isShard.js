const schemaFinder = require('../lib/schemaFinder')

module.exports = (msg) => schemaFinder('shard')(msg)
