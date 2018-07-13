const definitions = require('ssb-schema-definitions')
const SCHEMA_VERSION = 1

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'root', 'quorum', 'shards', 'tool'],
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
    quorum: { type: 'number' },
    shards: { type: 'number' },
    tool: { type: 'string' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: definitions
}
