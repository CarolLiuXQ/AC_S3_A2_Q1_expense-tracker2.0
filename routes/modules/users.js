const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', (req, res) => {
  console.log('login post')
})

//儲存使用者資訊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('Account Exist.')
      return res.render('register', { name, email })
    }
    return User.create({ name, email, password })
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router