const { describe } = require('tape-plus')
const { readdirSync } = require('fs')
const { join } = require('path')

const reply = require('./v1.json')
const { isReply } = require('../..')
const schema = require('../../schemas/reply/v1')

describe('dark-crystal reply (aka invite-reply +) (v1)', context => {
  context('isReply checks shareVersion correctly', (assert, done) => {
    assert.ok(isReply(reply), 'accepts a valid reply')

    reply.shareVersion = '1000'
    assert.notOk(isReply(reply), 'rejects invalid shareVersion')

    reply.shareVersion = '1a0b0'
    assert.notOk(isReply(reply), 'rejects invalid shareVersion "1a0b0"')

    // NOTE - I don't like this at all...
    delete reply.shareVersion
    assert.ok(isReply(reply), 'accepts missing shareVersion')

    done()
  })

  context('schema has up to date shareVersion regex', (assert, done) => {
    const currentPattern = schema.properties.shareVersion.pattern
    const expectedPattern = buildExpectedPattern()

    assert.equal(currentPattern, expectedPattern, 'includes all current share versions')

    done()
  })
})

function buildExpectedPattern () {
  const folder = join(__dirname, '../../schemas/shard')

  const versions = readdirSync(folder)
    .map(filename => require(join(folder, filename)))
    .map(schema => schema.properties.version.pattern)
    .map(pattern => pattern.replace(/(\^|\$)/g, '')) // trim  and $
  // e.g. ['1.0.0', '2.0.0']

  const regexVersions = versions.map(v => v.replace(/\./g, '\\.'))

  return `^(${regexVersions.join('|')})$`
}
