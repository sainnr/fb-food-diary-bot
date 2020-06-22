const mongoose = require('mongoose')
const Schema = mongoose.Schema

const food = new Schema({
  key: { type: String, required: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
})

const Food = mongoose.model('Food', food)

module.exports = Food