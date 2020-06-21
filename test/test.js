const assert = require('assert')
const queryService = require('../services/queryService')

it('gets one day summary', () => {
  queryService.saveMeal(1, 'aaa', 'aaa')
  queryService.saveMeal(2, 'bbb', 'bbb')

  const res = queryService.rangeSummary(1, 0)
  assert.equal(res.length, 1)

  const res2 = queryService.rangeSummary(1, 1)
  assert.equal(res2.length, 1)
})

const imageService = require('../services/imageService')

it('recognises image from URL', function(done) {
  const url = 'https://res.cloudinary.com/dntumlq4w/image/upload/v1592745476/food/noodle_c9gcdx.jpg'
  this.timeout(5000)
  imageService.recogniseUrl(url).then(res => {
    console.log(JSON.stringify(res))
    done()
  })
})

it('parses main dish', () => {
  const raw = [{
    "group": "Noodle Soup",
    "items": [{
      "food_id": "a4381ae99ce3686a",
      "group": "Noodle Soup",
      "name": "Tonkotsu Ramen",
      "nutrition": {"calories": 580, "protein": 0.028, "totalCarbs": 0.057, "totalFat": 0.027},
      "score": 111,
      "servingSizes": [{"unit": "1 bowl"}]
    }, {
      "food_id": "e1c66e713714a293",
      "group": "Noodle Soup",
      "name": "Shoyu Ramen",
      "nutrition": {"calories": 445, "protein": 0.0198, "totalCarbs": 0.0428, "totalFat": 0.0213},
      "score": 70,
      "servingSizes": [{"unit": "1 bowl"}]
    }]
  }, {
    "group": "Noodles",
    "items": [{
      "food_id": "1442e11f9acad92f",
      "group": "Noodles",
      "name": "Okinawa Soba",
      "nutrition": {
        "calories": 2285.714286,
        "protein": 0.06428571429,
        "totalCarbs": 0.4428571429,
        "totalFat": 0.02142857143
      },
      "score": 55,
      "servingSizes": [{"servingWeight": 0.114, "unit": "1 cup"}, {
        "servingWeight": 0.1,
        "unit": "100 g"
      }, {"servingWeight": 0.001, "unit": "1 g"}, {"servingWeight": 0.0283495, "unit": "1 oz"}]
    }]
  }]

  const dish = imageService.getMainDish(raw)
  console.log(JSON.stringify(dish))
})