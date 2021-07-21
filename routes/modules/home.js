const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Promise.all([Record.find().lean(), Category.find().lean()])
    .then(results => {
      const records = results[0]
      const category = results[1]
      let totalAmount = 0
      records.forEach(record => {
        const categoryFound = category.find(category =>
          category.categoryEN === record.category
        )
        record.category = categoryFound.iconHTML
        totalAmount += Number(record.amount)
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

///新增紀錄
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router