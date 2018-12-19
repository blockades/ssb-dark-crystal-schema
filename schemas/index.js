module.exports = {
  root: [
    require('./root/v1')
  ],
  ritual: [
    require('./ritual/v1'),
    require('./ritual/v2')
  ],
  shard: [
    require('./shard/v1'),
    require('./shard/v2')
  ],
  request: [
    require('./request/v1')
  ],
  reply: [
    require('./reply/v1')
  ],
  forward: [
    require('./forward/v1')
  ]
}
