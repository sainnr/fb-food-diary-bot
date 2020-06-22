const URI = process.env.MONGODB_URI
if (!URI) {
  console.error('No MONGODB_URI has been provided!')
}

const mongoose = require('mongoose')
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Established mongoose connection')
})

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error : ' + err)
})