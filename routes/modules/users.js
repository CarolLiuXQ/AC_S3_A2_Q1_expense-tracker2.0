const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

//儲存使用者資訊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'Every field is required!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password is not same as confirm password.' })
  }
  if (errors.length) {
    return res.render('register', { name, email, password, errors })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'This email has been registered.' })
      return res.render('register', { name, email, errors })
    }

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({ name, email, password: hash }))
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })
})

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', 'Logout successful!')
  res.redirect('/users/login')
})

module.exports = router