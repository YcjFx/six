// test.js

const assert = require('assert')
const app = require('../app.js')

describe('add function', () => {
  it('should return 3 when adding 1 and 2', () => {
    assert.equal(app.add(1, 2), 3)
  })

  it('should return 0 when adding 0 and 0', () => {
    assert.equal(app.add(0, 0), 0)
  })

  it('should return NaN when adding "hello" and "world"', () => {
    assert.ok(isNaN(app.add("hello", "world")))
  })
})