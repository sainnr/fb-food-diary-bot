const senderService = require('./senderService')
const diaryService = require('./diaryService')
const imageService = require('./imageService')
const queryService = require('./queryService')

const serialize = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64')
const deserialize = (b) => JSON.parse(Buffer.from(b, 'base64'))

/**
 * Handle incoming message and decode user's intent.
 *
 * For text messages, intent & entities are coming from NLP layer.
 * For images, the intent is supposed to be 'save'-only, given that an image can be decoded into an entity.
 *
 * The intent & entities are passed into the command service to process the command further and generate an outcome.
 * */
module.exports = {
  handleQuickReply: (senderPsid, receivedMessage) => {
    const payload = deserialize(receivedMessage.quick_reply.payload)
    const dish = {
      name: payload.dishName,
      calories: payload.dishCalories,
    }
    queryService.saveMeal(senderPsid, dish, payload.meal)
    const response = {
      "text": `Thanks! Saved your ${payload.meal} meal as ${dish.name}, that's around ${dish.calories} calories.`
    }
    senderService.sendResponse(senderPsid, response);
  },

  handleMessage: async (senderPsid, receivedMessage) => {
    let response

    if (receivedMessage.text) {
      const intents = receivedMessage.nlp.intents
      const entities = receivedMessage.nlp.entities
      const result = diaryService.processIntent(senderPsid, intents, entities)
      response = {
        "text": result
      }
    } else if (receivedMessage.attachments) {
      const attachmentUrl = receivedMessage.attachments[0].payload.url
      const result = await imageService.recogniseUrl(attachmentUrl)
      if (result) {
        const payload = (answer) => serialize({
          answer,
          dishName: result.name,
          dishCalories: result.calories,
        })
        // console.log(payload("test"))
        response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [{
                "title": `Look like ${result.name}, add to the diary?`,
                "subtitle": `Should be about ${result.calories} kcal.`,
                "image_url": attachmentUrl,
                "buttons": [
                  {
                    "type": "postback",
                    "title": "Add to the diary",
                    "payload": payload("yes"),
                  },
                  {
                    "type": "postback",
                    "title": "Forget it",
                    "payload": payload("no"),
                  }
                ],
              }]
            }
          }
        }
      } else {
        response = {
          "text": "Sorry, couldn't digest this. Please make sure the image is 550x550px and contains food."
        }
      }
    }
    senderService.sendResponse(senderPsid, response);
  },

  handlePostback: (senderPsid, receivedPostback) => {
    // console.log(receivedPostback.payload)
    const payload = deserialize(receivedPostback.payload, 'base64')
    const answer = payload.answer
    // console.log(payload)
    let response

    if (answer === 'yes') {
      const mealPayload = (meal) => serialize({
        ...payload,
        meal
      })
      response = {
        "text": "What was the mealtime?",
        "quick_replies": [
          {
            "content_type": "text",
            "title": "Breakfast",
            "payload": mealPayload("breakfast"),
          }, {
            "content_type": "text",
            "title": "Lunch",
            "payload": mealPayload("lunch"),
          }, {
            "content_type": "text",
            "title": "Dinner",
            "payload": mealPayload("dinner"),
          }, {
            "content_type": "text",
            "title": "snack",
            "payload": mealPayload("snack"),
          }
        ]
      }
    } else if (answer === 'no') {
      response = { "text": "No problem." }
    }
    senderService.sendResponse(senderPsid, response)
  }
}