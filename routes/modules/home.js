const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  //同時在DB中搜尋records和categories這兩張表
  Promise.all([Record.find({ userId }).lean(), Category.find().lean()])
    .then(results => {
      const records = results[0]
      const category = results[1]
      const filteredCategory = req.query.category
      let totalAmount = 0

      //篩選類別的records
      let filteredRecords = records.filter(record => {
        //因為當是首頁時,他的filteredCategory是undefined,以及篩選如果是"類別"的話,filteredCategory是category要是全選
        if (filteredCategory === 'category' || filteredCategory === undefined) {
          return record
        }
        return record.category === filteredCategory
      })

      //把篩選過後的每一筆資料的類別icon串上iconHTML,以及計算總計金額
      filteredRecords.forEach(record => {
        const categoryFound = category.find(category =>
          category.categoryId === record.category
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
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router