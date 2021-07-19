const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker')

db.on('error', () => {
  console.log('mongobd error')
})

db.once('open',()=>{
  console.log('mongobd connected')
})