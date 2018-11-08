const fs = require('fs')
const { describe } = require('tape-plus')
const { isForward } = require('../v1/')
const errorParser = require('../v1/lib/errorParser')

describe('dark-crystal/forward schema', context => {
  let forward

  context.beforeEach(c => {
    forward = JSON.parse(fs.readFileSync('./test/fixtures/forward.json', 'utf8'))
  })

  context('forward is valid', assert => {
    assert.ok(isForward(forward))

    forward.recps.map(recp => { return { link: recp, name: 'Bobo the Clown' } })
    assert.ok(isForward(forward))
  })

  context('invalid type', assert => {
    forward.type = 'dark-smchystal/forward'
    assert.notOk(isForward(forward))

    assert.deepEqual(errorParser(isForward), ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    forward.version = 1
    assert.notOk(isForward(forward))

    assert.deepEqual(errorParser(isForward), ['data.version: is the wrong type'])
  })

  context('invalid shard', assert => {
    forward.shard = "foo"
    assert.notOk(isForward(forward))

    assert.deepEqual(errorParser(isForward), ['data.shard: referenced schema does not match'])
  })

  context('invalid recps', assert => {
    forward.recps = ['thisisnotafeedId', 'nor is this']
    assert.notOk(isForward(forward))

    assert.deepEqual(errorParser(isForward), ['data.recps.0: no (or more than one) schemas match', 'data.recps.1: no (or more than one) schemas match'])
  })
})

