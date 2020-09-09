const { buyingLikelinessRules } = require('../middleware/buyingLikelinessRules') 

test('Should return points (number) based on buying likeliness criteria #1', () => {
  const req = {
    body: {
      name: 'George Smith',
      zip: '70123'
    }
  }

  const points = buyingLikelinessRules(req);
  expect(points).toBe(1)
})

test('Should return points (number) based on buying likeliness criteria #2', () => {
  const req = {
    body: {
      name: 'Zoe Jackson',
      zip: '70123'
    }
  }

  const points = buyingLikelinessRules(req);
  expect(points).toBe(2)
})

test('Should return points (number) based on buying likeliness criteria #3', () => {
  const req = {
    body: {
      name: 'Jane Doe',
      zip: '80812'
    }
  }

  const points = buyingLikelinessRules(req);
  expect(points).toBe(0)
})