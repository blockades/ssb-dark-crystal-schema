const fs = require('fs')
const { join } = require('path')
const { describe } = require('tape-plus')
const errorParser = require('../../lib/errorParser')
const { isRoot } = require('../..')

describe('dark-crystal/root v1 schema', context => {
  let root

  context.beforeEach(c => {
    root = JSON.parse(fs.readFileSync(join(__dirname, 'v1.json'), 'utf8'))
  })

  context('root is valid', assert => {
    assert.ok(isRoot(root))
  })

  context('invalid type', assert => {
    root.type = 'dark-smchystal/root'
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.type: pattern mismatch'], errorParser(isRoot))
  })

  context('invalid version', assert => {
    root.version = 1
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.version: No schemas match version 1'], errorParser(isRoot))
  })

  context('invalid name', assert => {
    root.name = { name: 'this is my name' }
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.name: is the wrong type'], errorParser(isRoot))
  })

  context('invalid recps', assert => {
    root.recps = [...root.recps, ...root.recps]
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.recps: has more items than allowed'], errorParser(isRoot))

    root.recps = ['thisisnotafeedId']
    assert.notOk(isRoot(root))
    assert.deepEqual(['data.recps.0: no (or more than one) schemas match'], errorParser(isRoot))
  })
})
