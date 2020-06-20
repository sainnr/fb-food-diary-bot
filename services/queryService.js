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
}

const diary = {}

const fromBeginning = (days) => {
  const dateFrom = new Date()
  dateFrom.setDate(dateFrom.getDate() - days)
  dateFrom.setHours(0, 0, 0, 0)

  return dateFrom
}

module.exports = {
  findDish: (dishName) => {
    const result = dishes[dishName]
    return result ? result : { name: 'unknown', calories: 0 }
  },

  saveMeal: (psid, dish, meal) => {
    const entry = {
      dishName: dish.name,
      dishCalories: dish.calories,
      meal,
      ts: Date.now()
    }
    if (psid in diary) {
      diary[psid].push(entry)
    } else {
      diary[psid] = [entry]
    }
    console.log('State:')
    console.log(JSON.stringify(diary))
  },

  rangeSummary: (psid, range) => {
    const dateFrom = fromBeginning(range)
    const entries = diary[psid]
    return entries.filter(line => line.ts > dateFrom)
  }
}