const senderService = require('./senderService')

module.exports = {
  handleMessage: (senderPsid, receivedMessage) => {
    let response

    if (receivedMessage.text) {
      response = {
        "text": `You sent the message: "${receivedMessage.text}". Now send me an attachment!`
      }
    } else if (receivedMessage.attachments) {
      let attachmentUrl = receivedMessage.attachments[0].payload.url
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
    console.log('ok')
    let response
    const payload = receivedPostback.payload

    if (payload === 'yes') {
      response = { "text": "Thanks!" }
    } else if (payload === 'no') {
      response = { "text": "Oops, try sending another image." }
    }

    senderService.sendResponse(senderPsid, response)
  }
}