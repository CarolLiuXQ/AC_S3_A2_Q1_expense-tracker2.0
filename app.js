const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')

const app = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')

app.use(express.static('public'))
app.engine('handlebars', exphbs({
  default: 'main',
  helpers: require('./controller/handlebarsHelper')
}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})