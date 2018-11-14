const fs = require('fs')
const { join } = require('path')
const { describe } = require('tape-plus')
// const errorParser = require('../../lib/errorParser')
// const { isShard } = require('../..')
const isShard = buildTempIsShard() // TODO delete this later!

function buildTempIsShard () {
  // extend the schemas with a hypothetical v2
  const schemas = Object.assign({}, require('../../schemas'), {
    [require('../../schemas/v2/version')]: require('../../schemas/v2')
  })
  const validate = require('ssb-schema-validation')
  return validate(schemas).with('shard')
}

describe('dark-crystal/shard schema v2', context => {
  let shard

  context.beforeEach(c => {
    shard = JSON.parse(fs.readFileSync(join(__dirname, 'fixtures/shard.json'), 'utf8'))
  })

  context('shard is valid', assert => {
    assert.ok(isShard(shard))
  })

  context('v1 shard is still valid', assert => {
    const oldShard = JSON.parse(fs.readFileSync(join(__dirname, '../v1/fixtures/shard.json'), 'utf8'))
    assert.ok(isShard(oldShard))
  })
})
