const definitions = require('ssb-schema-definitions')
const SCHEMA_VERSION = require('./version')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'root', 'quorum', 'shards', 'recps'],
  properties: {
    type: {
      type: 'string',
      pattern: '^dark-crystal/ritual$'
    },
    version: {
      type: 'string',
      pattern: `^${SCHEMA_VERSION}$`
    },
    root: { $ref: '#/definitions/messageId' },
    quorum: {
      type: 'integer',
      minimum: 2
    },
    shards: {
      type: 'integer',
      minimum: 2
    },
    recps: {
      type: 'array',
      minItems: 1,
      maxItems: 1,
      items: { $ref: '#/definitions/feedId' }
    }
  },
  definitions
}
