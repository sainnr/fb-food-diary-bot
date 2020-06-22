const mongoose = require('mongoose')
const Schema = mongoose.Schema

const diary = new Schema({
  psid: { type: String, required: true },
  dishName: { type: String, required: true },
  dishCalories: { type: Number, required: true },
  meal: { type: String, required: true },
  ts: { type: Date, required: true },
})

const Diary = mongoose.model('Diary', diary)

module.exports = Diary