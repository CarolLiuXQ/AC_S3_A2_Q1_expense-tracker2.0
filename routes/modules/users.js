const express = require('express')
const router = express.Router()

router.get('/login',(req,res)=>{
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login',(req,res)=>{
  console.log('login post')
})

router.post('/register', (req, res) => {
  console.log('register post')
})


module.exports = router