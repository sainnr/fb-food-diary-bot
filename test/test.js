const assert = require('assert')
const queryService = require('../services/queryService')

it('get one day summary', () => {
  queryService.saveMeal(1, 'aaa', 'aaa')
  queryService.saveMeal(2, 'bbb', 'bbb')

  const res = queryService.rangeSummary(1, 0)
  assert.equal(res.length, 1)

  const res2 = queryService.rangeSummary(1, 1)
  assert.equal(res2.length, 1)
})