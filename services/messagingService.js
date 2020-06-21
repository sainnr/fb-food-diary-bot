const senderService = require('./senderService')
const diaryService = require('./diaryService')
const imageService = require('./imageService')

/**
 * Handle incoming message and decode user's intent.
 *
 * For text messages, intent & entities are coming from NLP layer.
 * For images, the intent is supposed to be 'save'-only, given that an image can be decoded into an entity.
 *
 * The intent & entities are passed into the command service to process the command further and generate an outcome.
 * */
module.exports = {
  handleMessage: async (senderPsid, receivedMessage) => {
    let response

    // handle text to ask for picture, or create a postback with an image link
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
                    "title": "Yes!",
                    "payload": "yes",
                  },
                  {
                    "type": "postback",
                    "title": "No!",
                    "payload": "no",
                  }
                ],
              }]
            }
          }
        }
      } else {
        response = {
          "text": 'Sorry, no idea what it is. Can you please try another picture?'
        }
      }
    }
    senderService.sendResponse(senderPsid, response);
  },

  handlePostback: (senderPsid, receivedPostback) => {
    // console.log('ok')
    let response
    // console.log(receivedPostback)
    const payload = receivedPostback.payload

    if (payload === 'yes') {
      response = { "text": "Thanks!" }
    } else if (payload === 'no') {
      response = { "text": "Oops, try sending another image." }
    }
    senderService.sendResponse(senderPsid, response)
  }
}