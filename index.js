const express = require('express')
const bodyParser = require('body-parser')
const verificationController = require('./controllers/verification')
const messagingController = require('./controllers/messaging')

const PORT = process.env.PORT || 9000

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`Webhook server, port ${PORT}`))

app.get('/', verificationController)
app.post('/', messagingController)

require('./models')
