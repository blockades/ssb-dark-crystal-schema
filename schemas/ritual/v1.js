const definitions = require('ssb-schema-definitions')

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
      pattern: '^1.0.0$'
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
    tool: { type: 'string' },
    // tool should actually === secrets.js-grempe
    // otherwise we can't recombine!
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: definitions
}
