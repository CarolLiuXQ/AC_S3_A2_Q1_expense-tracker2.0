const db = require('../../config/mongoose')
const Record = require('../record')
const recordJson = require('./recordsSeeder.json')

db.once('open', () => {
  for (let key in recordJson) {
    Record.create({
      name: recordJson[key].name,
      category: recordJson[key].category,
      date: recordJson[key].date,
      amount: recordJson[key].amount
    })
  }
  console.log('done!')
})