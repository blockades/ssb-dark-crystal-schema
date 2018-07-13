const definitions = require('ssb-schema-definitions')
const SCHEMA_VERSION = 1

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
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: definitions
}
