const express = require('express')
const bodyParser = require('body-parser')
const verificationController = require('./controllers/verification')
const messagingController = require('./controllers/messaging')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(9000, () => console.log('Webhook server, port 9000'))

app.get('/', verificationController)
app.post('/', messagingController)
