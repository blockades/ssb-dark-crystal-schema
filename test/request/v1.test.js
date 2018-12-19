const { describe } = require('tape-plus')

const request = require('./v1.json')
const { isRequest } = require('../..')

describe('dark-crystal request (aka invite) (v1)', context => {
  context('isRequest checks correctly', (assert, done) => {
    assert.ok(isRequest(request), 'accepts a valid request')

    done()
  })
})
