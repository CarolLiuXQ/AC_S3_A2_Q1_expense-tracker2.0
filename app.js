const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')

app.engine('handlebars', exphbs({ default: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/records/new', (req, res) => {
  res.render('new')
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})