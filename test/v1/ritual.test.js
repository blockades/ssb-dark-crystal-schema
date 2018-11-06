const fs = require('fs')
const { describe } = require('tape-plus')
const { isRitual } = require('../../v1/')
const errorParser = require('../../v1/lib/errorParser')

describe('dark-crystal/ritual schema', context => {
  let ritual

  context.beforeEach(c => {
    ritual = JSON.parse(fs.readFileSync('./test/v1/fixtures/ritual.json', 'utf8'))
  })

  context('is valid', assert => {
    assert.ok(isRitual(ritual))

    ritual.recps.map(recp => { return { link: recp, name: 'Bobo the Clown' } })
    assert.ok(isRitual(ritual))
  })

  context('invalid type', assert => {
    ritual.type = 'dark-smchystal/ritual'
    assert.notOk(isRitual(ritual))
    assert.deepEqual(errorParser(isRitual), ['data.type: pattern mismatch'])
  })

  context('can attach errors to tested object', assert => {
    ritual.type = 'dark-smchystal/ritual'
    assert.notOk(isRitual(ritual, {attachErrors: true}))
    assert.deepEqual(errorParser(ritual), ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    ritual.version = 1
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.version: is the wrong type'])
  })

  context('invalid quorum', assert => {
    ritual.quorum = "3"
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.quorum: is the wrong type'])

    ritual.quorum = 3.2
    assert.notOk(isRitual(ritual))

    ritual.quorum = 1
    assert.notOk(isRitual(ritual))
  })

  context('invalid shards', assert => {
    ritual.shards = "3"
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.shards: is the wrong type'])

    ritual.shards = 1
    assert.notOk(isRitual(ritual))
  })

  context('invalid tool', assert => {
    ritual.tool = { library: 'secrets.js' }
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.tool: is the wrong type'])
  })

  context('invalid recps', assert => {
    ritual.recps = ['thisisnotafeedId']
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.recps: referenced schema does not match'])
  })
})
