const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

///new page 
router.get('/new', (req, res) => {
  res.render('new')
})


////刪除紀錄
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ userId, _id })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


///修改紀錄
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ userId, _id })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  const _id = String(req.params.id)
  return Record.findOne({ userId, _id })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router