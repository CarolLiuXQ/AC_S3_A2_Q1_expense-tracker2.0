const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

///new page 
router.get('/new', (req, res) => {
  res.render('new')
})


////刪除紀錄
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


///修改紀錄
router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const { name, date, category, amount } = req.body
  const id = String(req.params.id)
  return Record.findById(id)
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