
const fs = require('fs')
const { describe } = require('tape-plus')
const errorParser = require('../v1/lib/errorParser')
const { isRoot } = require('../')

describe('dark-crystal/root schema', context => {
  let root

  context.beforeEach(c => {
    root = JSON.parse(fs.readFileSync('./test/v1/fixtures/root.json', 'utf8'))
  })

  context('root is valid', assert => {
    assert.deepEqual(isRoot(root), [true, '1.0.0'])

    root.recps.map(recp => { return { link: recp, name: 'Bobo the Clown' } })
    assert.deepEqual(isRoot(root), [true, '1.0.0'])
  })

  context('invalid type', assert => {
    root.type = 'dark-smchystal/root'
    assert.deepEqual(isRoot(root), [false, '1.0.0'])
    assert.deepEqual(['data.type: pattern mismatch'], errorParser(isRoot))
  })

  context('invalid version', assert => {
    root.version = '3'
    assert.deepEqual(isRoot(root), [false, '3'])
    assert.deepEqual(['data.version: not recognised'], errorParser(isRoot))
  })

  context('invalid name', assert => {
    root.name = { name: 'this is my name' }
    assert.deepEqual(isRoot(root), [false, '1.0.0'])
    assert.deepEqual(['data.name: is the wrong type'], errorParser(isRoot))
  })

  context('invalid recps', assert => {
    root.recps = [...root.recps, ...root.recps]
    assert.deepEqual(isRoot(root), [false, '1.0.0'])
    assert.deepEqual(['data.recps: has more items than allowed'], errorParser(isRoot))

    root.recps = ['thisisnotafeedId']
    assert.deepEqual(isRoot(root), [false, '1.0.0'])
    assert.deepEqual(['data.recps.0: no (or more than one) schemas match'], errorParser(isRoot))
  })
})
