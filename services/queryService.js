const Food = require('../models/Food')
const Diary = require('../models/Diary')

// use it just once
const bootstrap = () => {
  const dishes = {
    'pizza': { name: 'slice of classic pizza', calories: 270 },
    'sandwich': { name: 'ham & cheese sandwich', calories: 230 },
    'pasta': { name: 'pasta with cheese', calories: 640 },
    'salad': { name: 'veggie salad', calories: 180 },
    'potatoes': { name: 'roasted potatoes', calories: 520 },
    'crisps': { name: 'crisps bag', calories: 120 },
    'eggs': { name: 'boiled eggs', calories: 160 },
    'fries': { name: 'french fries', calories: 410 },
    'apple': { name: 'apple', calories: 90 },
    'berries': { name: 'apple', calories: 70 },
    'beef': { name: 'beef steak', calories: 600 },
    'chicken': { name: 'chicken breasts', calories: 400 },
    'pork': { name: 'roasted pork', calories: 700 },
    'cake': { name: 'piece of cake', calories: 270 },
  }
  Object.keys(dishes).map(key => {
    const dish  = { ...dishes[key],
      key
    }
    Food.create(dish)
  })
}
// bootstrap()

const fromBeginning = (days) => {
  const dateFrom = new Date()
  dateFrom.setDate(dateFrom.getDate() - days)
  dateFrom.setHours(0, 0, 0, 0)

  return dateFrom
}

module.exports = {
  findDish: (dishKey) => {
    return Food.findOne({ key: dishKey }).catch(err => {
      console.error(err)
      return { name: 'unknown', calories: 0 }
    })
  },

  saveMeal: (psid, dish, meal) => {
    const entry = {
      psid,
      dishName: dish.name,
      dishCalories: dish.calories,
      meal,
      ts: new Date()
    }
    return Diary.create(entry)
  },

  rangeSummary: (psid, range) => {
    const dateFrom = fromBeginning(range)
    // console.log(dateFrom)
    return Diary.find({ psid, ts: {"$gt": dateFrom} })
  }
}