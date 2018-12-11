const fs = require('fs')
const { join } = require('path')
const { describe } = require('tape-plus')
const errorParser = require('../../lib/errorParser')
const { isForward } = require('../..')

describe('dark-crystal/forward schema', context => {
  let forward

  context.beforeEach(c => {
    forward = JSON.parse(fs.readFileSync(join(__dirname, 'fixtures/forward.json'), 'utf8'))
  })

  context('forward is valid', assert => {
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

    assert.deepEqual(errorParser(isForward), ['data.version: is not a valid version'])
  })

  context('invalid shard', assert => {
    forward.shard = 2
    assert.notOk(isForward(forward))

    assert.deepEqual(errorParser(isForward), ['data.shard: is the wrong type'])
  })

  context('invalid recps', assert => {
    forward.recps = ['thisisnotafeedId', 'nor is this']
    assert.notOk(isForward(forward))

    assert.deepEqual(errorParser(isForward), [ 'data.recps.0: referenced schema does not match', 'data.recps.1: referenced schema does not match' ])
  })

  context('missing shareVersion', assert => {
    delete forward.shareVersion
    assert.notOk(isForward(forward))
    assert.deepEqual(errorParser(isForward), [ 'data.shareVersion: is required' ])
  })

  context('invalid shareVersion', assert => {
    forward.shareVersion = 'dog'
    assert.notOk(isForward(forward))
    assert.deepEqual(errorParser(isForward), [ 'data.shareVersion: pattern mismatch' ])
  })
})
