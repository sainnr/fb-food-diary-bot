const axios = require('axios')

const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN

module.exports = {
  sendResponse: (senderPsid, response) => {
    const requestBody = {
      "recipient": {
        "id": senderPsid
      },
      "message": response
    }

    axios.post('https://graph.facebook.com/v2.6/me/messages', requestBody, {
      params: { "access_token": PAGE_ACCESS_TOKEN }
    }).then(() => {
      console.log('message sent!')
    }).catch((err) => {
      console.error("Unable to send message:" + err);
    })
  }
}