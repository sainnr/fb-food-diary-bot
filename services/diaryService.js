const queryService = require('./queryService')

const getIntent = (possibleIntents) => {
  if (!possibleIntents || !possibleIntents.length) {
    return 'empty_intent'
  }
  const candidate = possibleIntents[0]
  if (candidate.confidence < 0.7) {
    return `low_confidence:${candidate.name}`
  }
  return candidate.name
}

const getDish = (entities) => {
  const dish = entities["dish:dish"]
  if (!dish || !dish.length) {
    return 'empty_dish'
  }
  const candidate = dish[0]
  if (candidate.confidence < 0.7) {
    return `low_confidence:${candidate.value}`
  }
  return candidate.value
}

const getMeal = (entities) => {
  const meal = entities["meal:meal"]
  if (!meal || !meal.length) {
    return 'empty_meal'
  }
  const candidate = meal[0]
  if (candidate.confidence < 0.7) {
    return `low_confidence:${candidate.value}`
  }
  return candidate.value
}

const daysInRange = (range) => {
  if (range === 'day') {
    return 0
  } else if (range === 'yesterday') {
    return 1
  } else if (range === 'week') {
    return 7
  } else {
    return -1
  }
}

const getRange = (entities) => {
  const range = entities["range:range"]
  if (!range || !range.length) {
    return 'empty_range'
  }
  const candidate = range[0]
  if (candidate.confidence < 0.7) {
    return `low_confidence:${candidate.value}`
  }
  return candidate.value
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

      const dish = queryService.findDish(mainDish)
      queryService.saveMeal(psid, dish, mainMeal)

      return `Saved your ${mainMeal} meal as ${dish.name}, that's around ${dish.calories} calories.`
    } else if (mainIntent === 'show_summary') {
      const mainRange = getRange(entities)

      const summary = queryService.rangeSummary(psid, daysInRange(mainRange))

      return dailySummaryMessage(summary)
    } else {
      console.error(`What should I do with this: ${ mainIntent }`)
      return 'Sorry, no idea what to do with this...'
    }
  },

}