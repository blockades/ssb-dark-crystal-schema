const definitions = require('ssb-schema-definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'root', 'shard', 'recps'],
  properties: {
    type: {
      type: 'string',
      pattern: '^dark-crystal/shard$'
    },
    version: {
      type: 'string',
      pattern: '^2.0.0$'
    },
    root: { $ref: '#/definitions/messageId' },
    shard: { $ref: '#/definitions/encrypt/box' },
    recps: {
      type: 'array',
      maxItems: 2,
      minItems: 2,
      items: { $ref: '#/definitions/feedId' }
    },
    attachment: { $ref: '#/definitions/blobId' }
  },
  definitions
}
