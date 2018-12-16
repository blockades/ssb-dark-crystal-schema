const definitions = require('ssb-schema-definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'root', 'shard', 'recps', 'shareVersion'],
  properties: {
    type: {
      type: 'string',
      pattern: '^dark-crystal/forward'
    },
    version: {
      type: 'string',
      pattern: '1.0.0'
    },
    shareVersion: {
      type: 'string',
      pattern: '^[0-9]+\.[0-9]+\.[0-9]+$'
    },
    shard: { type: 'string' },
    root: { $ref: '#/definitions/messageId' },
    branch: { $ref: '#/definitions/branch' },
    recps: {
      type: 'array',
      maxItems: 2,
      minItems: 2,
      items: { $ref: '#/definitions/feedId' }
    }
  },
  definitions
}
