const { describe } = require('tape-plus')
const { isForwardRequest } = require('../..')
const fs = require('fs')
const { join } = require('path')
const errorParser = require('../../lib/errorParser')

describe('dark-crystal/forward-request v1 schema', context => {
  let forwardRequest

  context.beforeEach(c => {
    forwardRequest = JSON.parse(fs.readFileSync(join(__dirname, 'v1.json'), 'utf8'))
  })

  context('forward-request is valid', assert => {
    assert.ok(isForwardRequest(forwardRequest))
  })

  context('invalid type', assert => {
    forwardRequest.type = 'dark-smchystal/forward-request'
    assert.notOk(isForwardRequest(forwardRequest))

    assert.deepEqual(errorParser(isForwardRequest), ['data.type: pattern mismatch'])
  })

  context('invalid version', assert => {
    forwardRequest.version = 1
    assert.notOk(isForwardRequest(forwardRequest))

    assert.deepEqual(errorParser(isForwardRequest), ['data.version: No schemas match version 1'])
  })

  context('invalid secret owner', assert => {
    forwardRequest.secretOwner = 'this is not a feed Id'
    assert.notOk(isForwardRequest(forwardRequest))
    assert.deepEqual(errorParser(isForwardRequest), ['data.secretOwner: referenced schema does not match'])
  })

  context('invalid recps', assert => {
    forwardRequest.recps = ['thisisnotafeedId', 'nor is this']
    assert.notOk(isForwardRequest(forwardRequest))
    assert.deepEqual(errorParser(isForwardRequest), [
      'data.recps.0: no (or more than one) schemas match',
      'data.recps.1: no (or more than one) schemas match'
    ])
  })
})
