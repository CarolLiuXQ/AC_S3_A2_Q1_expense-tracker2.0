const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  categoryEN: {
    type: String,
    required: true
  },
  categoryCH: {
    type: String,
    required: true
  },
  iconHTML: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Category', categorySchema)