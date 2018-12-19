const merge = require('lodash.merge')
const inviteReplySchema = require('ssb-invite-schema/src/v1/reply/schema/reply.js')

const replySchema = merge({}, inviteReplySchema)

// replySchema.required.push('shareVersion')
replySchema.properties.shareVersion = {
  type: 'string',
  pattern: '^(1\\.0\\.0|2\\.0\\.0)$'
}

module.exports = replySchema
