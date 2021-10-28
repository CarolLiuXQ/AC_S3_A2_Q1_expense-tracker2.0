const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
const session = require('express-session')
const usePassport = require('./config/passport')

const app = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')

app.use(express.static('public'))
app.engine('handlebars', exphbs({
  default: 'main',
  helpers: require('./controller/handlebarsHelper')
}))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})