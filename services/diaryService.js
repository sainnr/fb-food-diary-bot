const getIntent = (possibleIntents) => {
  return 'save_meal'
}

const getDish = (entities) => {
  return 'pizza'
}

const getMeal = (entities) => {
  return 'lunch'
}

const getRange = (entities) => {
  return 'day'
}

const findDish = (dishName) => {
  // TODO: query known dish by name
  return {
    name: dishName,
    calories: 100,
  }
}

const saveMeal = (psid, dish, meal) => {
  console.log(`Command: save meal, ${dish}, ${meal} for ${psid}`)
  // TODO: save to db
}

const getSummary = (psid, range) => {
  console.log(`Command: get summary, ${range} for ${psid}`)
  // TODO: decode range and query for summary

  const mockSummary = [
    { meal: 'breakfast', dish: 'sandwich', calories: 200 },
    { meal: 'lunch', dish: 'salad', calories: 150 },
  ]
  return dailySummaryMessage(mockSummary)
}

const dailySummaryMessage = (summary) => {
  const lines = summary.map(line => `${line.meal}: ${line.dish} (${line.calories})\n`)
  return 'You are doing good today!\n'.concat(lines)
}

module.exports = {
  processIntent: (psid, possibleIntents, entities) => {
    const mainIntent = getIntent(possibleIntents)

    if (mainIntent === 'save_meal') {
      const mainDish = getDish(entities)
      const mainMeal = getMeal(entities)
      const dish = findDish(mainDish)

      saveMeal(psid, dish, mainMeal)

      return `Saved as ${dish.name}, that's around ${dish.calories} calories.`
    } else if (mainIntent === 'show_summary') {
      const mainRange = getRange(entities)

      const msg = getSummary(psid, mainRange)

      return msg
    } else {
      console.log(`What should I do with this: ${ mainIntent }`)
    }
  },

}