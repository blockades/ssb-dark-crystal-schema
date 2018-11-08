module.exports = {
  isRoot: require('./root/sync/isRoot'),
  isRitual: require('./ritual/sync/isRitual'),
  isShard: require('./shard/sync/isShard'),
  isForward: require('./forward/sync/isForward'),
  errorParser: require('./lib/errorParser'),
  SCHEMA_VERSION: require('./version')
}
