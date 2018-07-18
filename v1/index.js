module.exports = {
  isRoot: require('./root/sync/isRoot'),
  isRitual: require('./ritual/sync/isRitual'),
  isShard: require('./shard/sync/isShard'),
  errorParser: require('./lib/errorParser'),
  SCHEMA_VERSION: require('./version')
}
