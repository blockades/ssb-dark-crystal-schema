const fs = require('fs')
const { join } = require('path')
const { describe } = require('tape-plus')
const errorParser = require('../../lib/errorParser')
const { isShard } = require('../..')

describe('dark-crystal/shard v2 schema', context => {
  let shard

  context.beforeEach(c => {
    shard = JSON.parse(fs.readFileSync(join(__dirname, 'v2.json'), 'utf8'))
  })

  context('shard is valid', assert => {
    assert.ok(isShard(shard))
  })

  context('invalid type', assert => {
    shard.type = 'dark-smchystal/shard'
    assert.notOk(isShard(shard))

    assert.deepEqual(errorParser(isShard), ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    shard.version = 1
    assert.notOk(isShard(shard))

    assert.deepEqual(errorParser(isShard), ['data.version: No schemas match version 1'])
  })

  context('invalid shard', assert => {
    shard.shard = 'foo'
    assert.notOk(isShard(shard))

    assert.deepEqual(errorParser(isShard), ['data.shard: referenced schema does not match'])
  })

  context('invalid recps', assert => {
    shard.recps = ['thisisnotafeedId', 'nor is this']
    assert.notOk(isShard(shard))

    assert.deepEqual(errorParser(isShard), [
      'data.recps.0: referenced schema does not match',
      'data.recps.1: referenced schema does not match'
    ])
  })

  context('invalid attachment blob reference', assert => {
    shard.attachment = { name: 123.45, reference: "not a blobId" }
    assert.notOk(isShard(shard))
    assert.deepEqual(errorParser(isShard), [
      'data.attachment.name: is the wrong type',
      'data.attachment.reference: referenced schema does not match'
    ])
  })
})
