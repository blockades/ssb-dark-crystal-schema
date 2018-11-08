const definitions = require('ssb-schema-definitions')
const SCHEMA_VERSION = require('../../version')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'version', 'name', 'recps'],
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
      minItems: 1,
      maxItems: 1,
      items: {
        oneOf: [
          { $ref: '#/definitions/feedId' },
          { $ref: '#/definitions/mentions/feed' }
        ]
      }
    }
  },
  definitions: definitions
}
