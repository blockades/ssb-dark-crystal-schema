const definitions = require('ssb-schema-definitions')
const SCHEMA_VERSION = 1 // require(' can you fill me innn ')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'name'],
  properties: {
    type: {
      type: 'string',
      pattern: '^dark-crystal/root$'
    },
    version: {
      type: 'string',
      pattern: `^${SCHEMA_VERSION}$`
    },
    name: { type: 'string' },
    recps: {
      type: 'array',
      items: {
        oneOf: [
          { type: 'null' },
          { $ref: '#/definitions/feedId' },
          { $ref: '#/definitions/feed' }
        ]
      }
    }
  },
  definitions: definitions
}
