module.exports = (req, res) => {
  const body = req.body
  console.log(body)

  if (body.object === 'page') {
    body.entry.forEach(function(entry) {

      const webhookEvent = entry.messaging[0]
      console.log(webhookEvent)

      const senderPsid = webhookEvent.sender.id
      console.log('Sender ID: ' + senderPsid)

      if (webhookEvent.message) {
        // handleMessage(senderPsid, webhookEvent.message)
      } else if (webhookEvent.postback) {
        // handlePostback(senderPsid, webhookEvent.postback)
      }

    })
    res.status(200).send('EVENT_RECEIVED')
  } else {
    res.sendStatus(404)
  }
}