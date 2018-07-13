const fs = require('fs')
const { describe } = require('tape-plus')

const validator = require('is-my-json-valid')
const schema = require('../v1/ritual/schema/ritual')
const validate = validator(schema, { verbose: true })

const { isRitual } = require('../v1/')

describe('dark-crystal/ritual schema', context => {
  let ritual

  context.beforeEach(c => {
    ritual = JSON.parse(fs.readFileSync('./test/fixtures/ritual.json', 'utf8'))
  })

  context('is valid', assert => {
    assert.ok(validate(ritual))
    assert.ok(isRitual(ritual))

    ritual.recps.map(recp => { return { link: recp, name: 'Bobo the Clown' } })
    assert.ok(validate(ritual))
    assert.ok(isRitual(ritual))
  })

  context('invalid type', assert => {
    ritual.type = 'dark-smchystal/ritual'
    assert.notOk(validate(ritual))
    assert.notOk(isRitual(ritual))

    var errors = ritual.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    ritual.version = 1
    assert.notOk(validate(ritual))
    assert.notOk(isRitual(ritual))

    var errors = ritual.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.version: is the wrong type'])
  })

  context('invalid quorum', assert => {
    ritual.quorum = "3"
    assert.notOk(validate(ritual))
    assert.notOk(isRitual(ritual))

    var errors = ritual.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.quorum: is the wrong type'])

    ritual.quorum = 3.2
    assert.notOk(isRitual(ritual))
  })

  context('invalid shards', assert => {
    ritual.shards = "3"
    assert.notOk(validate(ritual))
    assert.notOk(isRitual(ritual))

    var errors = ritual.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.shards: is the wrong type'])
  })

  context('invalid tool', assert => {
    ritual.tool = { library: 'secrets.js' }
    assert.notOk(validate(ritual))
    assert.notOk(isRitual(ritual))

    var errors = ritual.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.tool: is the wrong type'])
  })

  context('invalid recps', assert => {
    ritual.recps = ['thisisnotafeedId']
    assert.notOk(validate(ritual))
    assert.notOk(isRitual(ritual))

    var errors = ritual.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.recps: referenced schema does not match'])
  })
})
