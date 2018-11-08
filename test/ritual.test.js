const fs = require('fs')
const { describe } = require('tape-plus')
const errorParser = require('../lib/errorParser')
const { isRitual } = require('../')

describe('dark-crystal/ritual schema', context => {
  let ritual

  context.beforeEach(c => {
    ritual = JSON.parse(fs.readFileSync('./test/fixtures/ritual.json', 'utf8'))
  })

  context('is valid', assert => {
    assert.ok(isRitual(ritual))

    ritual.recps.map(recp => { return { link: recp, name: 'Bobo the Clown' } })
    assert.ok(isRitual(ritual))
  })

  context('invalid type', assert => {
    console.log("TYPE")
    ritual.type = 'dark-smchystal/ritual'
    assert.notOk(isRitual(ritual))
    assert.deepEqual(errorParser(isRitual), ['data.type: pattern mismatch'])
  })

  context('can attach errors to tested object', assert => {
    console.log("ERRORS")
    ritual.type = 'dark-smchystal/ritual'
    assert.notOk(isRitual(ritual, {attachErrors: true}))
    assert.deepEqual(errorParser(ritual), ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    console.log("VERSION")
    ritual.version = 1
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.version: is the wrong type'])
  })

  context('invalid quorum', assert => {
    console.log("QUORUM")
    ritual.quorum = "3"
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.quorum: is the wrong type'])

    ritual.quorum = 3.2
    assert.notOk(isRitual(ritual))

    ritual.quorum = 1
    assert.notOk(isRitual(ritual))
  })

  context('invalid shards', assert => {
    console.log("SHARDS")
    ritual.shards = "3"
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.shards: is the wrong type'])

    ritual.shards = 1
    assert.notOk(isRitual(ritual))
  })

  context('invalid tool', assert => {
    console.log("TOOL")
    ritual.tool = { library: 'secrets.js' }
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.tool: is the wrong type'])
  })

  context('invalid recps', assert => {
    console.log("RECPS")
    ritual.recps = ['thisisnotafeedId']
    assert.notOk(isRitual(ritual))

    assert.deepEqual(errorParser(isRitual), ['data.recps: referenced schema does not match'])
  })
})
