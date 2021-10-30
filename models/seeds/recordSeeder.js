const db = require('../../config/mongoose')
const Record = require('../record')
const recordJson = require('./recordsSeeder.json')
const User = require('../user')
const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 5 },
        (_, i) => Record.create({
          name: recordJson[i].name,
          category: recordJson[i].category,
          date: recordJson[i].date,
          amount: recordJson[i].amount,
          userId
        })
      ))
    })
    .then(() => {
      console.log('Records done.')
      process.exit()
    })
})