const merge = require('lodash.merge')
const inviteSchema = require('ssb-invite-schema/src/v1/invite/schema/invite.js')
const isCanonicalBase64 = require('is-canonical-base64')

const requestSchema = merge({}, inviteSchema)
inviteSchema.properties.ephPublicKey = {
  type: 'string',
  pattern: isCanonicalBase64(null, '\.curve25519', 32)
}

module.exports = requestSchema
