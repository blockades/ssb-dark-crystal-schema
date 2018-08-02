const fs = require('fs')
const { describe } = require('tape-plus')
const validator = require('is-my-json-valid')
const schema = require('../v1/root/schema/root')
const validate = validator(schema, { verbose: true })
const errorParser = require('../v1/lib/errorParser')

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
    assert.deepEqual(['data.type: pattern mismatch'], errorParser(root))
  })

  context('invalid version', assert => {
    root.version = 1
    assert.notOk(validate(root))
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.version: is the wrong type'], errorParser(root))
  })

  context('invalid name', assert => {
    root.name = 'this is my name'
    assert.notOk(validate(root))
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.name: pattern mismatch'], errorParser(root))
  })

  context('invalid recps', assert => {
    root.recps = [...root.recps, ...root.recps]
    assert.notOk(validate(root))
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.recps: has more items than allowed'], errorParser(root))

    root.recps = ['thisisnotafeedId']
    assert.notOk(validate(root))
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.recps.0: no (or more than one) schemas match'], errorParser(root))
  })
})
