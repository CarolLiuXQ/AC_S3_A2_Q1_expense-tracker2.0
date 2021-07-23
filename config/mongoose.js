const mongoose = require('mongoose')
const db = mongoose.connection
const MONGODB_URI = 'mongodb+srv://root:21RbD0uTJpWvysGZ@cluster0.avghh.mongodb.net/expense-tracker?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
  , useUnifiedTopology: true
})

db.on('error', () => {
  console.log('mongobd error')
})

db.once('open', () => {
  console.log('mongobd connected')
})

module.exports = db