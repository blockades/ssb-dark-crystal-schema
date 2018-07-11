const fs = require('fs')
const { describe } = require('tape-plus')
const validator = require('is-my-json-valid')
const schema = require('../v1/root/schema/root')
const validate = validator(schema, { verbose: true })

const { isRoot } = require('../v1/')

describe('dark-crystal/root schema', context => {
  let root

  context.beforeEach(c => {
    root = JSON.parse(fs.readFileSync('./test/fixtures/root.json', 'utf8'))
  })

  context('root is valid', assert => {
    assert.ok(validate(root))
    assert.ok(isRoot(root))

    root.recps.map(recp => { return { link: recp, name: 'Bobo the Clown' } })
    assert.ok(validate(root))
    assert.ok(isRoot(root))
  })

  context('invalid type', assert => {
    root.type = 'dark-smchystal/root'
    assert.notOk(validate(root))
    assert.notOk(isRoot(root))

    var errors = root.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    root.version = 1
    assert.notOk(validate(root))
    assert.notOk(isRoot(root))

    var errors = root.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.version: is the wrong type'])
  })

  context('invalid name', assert => {
    root.name = { name: 'this is my name' }
    assert.notOk(validate(root))
    assert.notOk(isRoot(root))

    var errors = root.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.name: is the wrong type'])
  })

  context('invalid recps', assert => {
    root.recps = ['thisisnotafeedId']
    assert.notOk(validate(root))
    assert.notOk(isRoot(root))

    var errors = root.errors.map(e => `${e.field}: ${e.message}`)
    assert.deepEqual(errors, ['data.recps: referenced schema does not match'])
  })
})
