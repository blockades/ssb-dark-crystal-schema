const definitions = require('ssb-schema-definitions')

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
      pattern: '^1.0.0$'
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
