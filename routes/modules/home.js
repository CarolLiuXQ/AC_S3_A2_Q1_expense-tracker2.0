const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Promise.all([Record.find().lean(), Category.find().lean()])
    .then(results => {
      const records = results[0]
      const category = results[1]
      let filteredCategory = req.query.category
      let totalAmount = 0
      //為了判定是不是首頁,如果是的話則顯示全部records
      filteredCategory === undefined ? filteredCategory='all' : null
      //為了首頁的類別篩選
      let filteredRecords = records.filter(record =>
        record.category === filteredCategory
      )
      //如果把篩選選擇類別的話,顯示全部紀錄
      filteredCategory === 'all' ? filteredRecords = records : filteredRecords = filteredRecords
      filteredRecords.forEach(record => {
        const categoryFound = category.find(category =>
          category.categoryEN === record.category
        )
        record.category = categoryFound.iconHTML
        totalAmount += Number(record.amount)
      })
      res.render('index', { records: filteredRecords, totalAmount, filteredCategory })
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