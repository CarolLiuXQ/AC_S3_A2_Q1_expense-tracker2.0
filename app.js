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

const Record = require('./models/record')
const Category = require('./models/category')

app.get('/', (req, res) => {
  Promise.all([Record.find().lean(), Category.find().lean()])
    .then(results => {
      const records = results[0]
      const category = results[1]
      records.forEach(record => {
        const categoryFound = category.find(category =>
          category.categoryEN === record.category
        )
        record.category = categoryFound.iconHTML
      })
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

///new page 
app.get('/records/new', (req, res) => {
  res.render('new')
})
///新增紀錄
app.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


////刪除紀錄
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


///修改紀錄
app.get('/records/:id/edit', (req, res) => {
  Record.findById(req.params.id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})
app.put('/records/:id', (req, res) => {

})




app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})