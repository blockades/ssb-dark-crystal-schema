const definitions = require('ssb-schema-definitions')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['version', 'type', 'secretOwner', 'recps'],
  properties: {
    version: {
      type: 'string',
      pattern: '^1.0.0$'
    },
    type: {
      type: 'string',
      pattern: '^dark-crystal/forward-request$'
    },
    secretOwner: { $ref: '#/definitions/feedId' },
    recps: {
      type: 'array',
      maxItems: 2,
      minItems: 2,
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
