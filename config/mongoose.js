const mongoose = require('mongoose')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

db.on('error', () => {
  console.log('mongobd error')
})

db.once('open', () => {
  console.log('mongobd connected')
})

module.exports = db