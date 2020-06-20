const senderService = require('./senderService')
const diaryService = require('./diaryService')

/**
 * Handle incoming message and decode user's intent.
 *
 * For text messages, intent & entities are coming from NLP layer.
 * For images, the intent is supposed to be 'save'-only, given that an image can be decoded into an entity.
 *
 * The intent & entities are passed into the command service to process the command further and generate an outcome.
 * */
module.exports = {
  handleMessage: (senderPsid, receivedMessage) => {
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
      // TODO: decode attached dish and confirm the rest of data with user (either postback or instant)
      const attachmentUrl = receivedMessage.attachments[0].payload.url
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
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