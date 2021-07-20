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
let category = ''

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

  // Record.find()
  //   .lean()
  //   .then(record => {
  //     Category.find({ categoryEN: record[0].category })
  //       .lean()
  //       .then(category => {
  //         category = category[0].iconHTML
  //         // console.log(category)
  //         // res.render('index', { category: category[0] })
  //       })
  //       .catch(error => console.log(error))
  //     console.log(category)
  //     res.render('index', { record: record[0], category })
  //   })

})

app.get('/records/new', (req, res) => {
  res.render('new')
})

///修改紀錄
app.get('/records/:id/edit', (req, res) => {
  res.render('edit')
})
app.put('/rcords/:id', (req, res) => {

})

////刪除紀錄
app.delete('/records/:id', (req, res) => {

})


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})