const db = require('../../config/mongoose')
const Category = require('../category')
const category = require('../../config/category.json')


db.once('open', () => {
  for (let key in category) {
    Category.create({
      categoryEN: key,
      categoryCH: category[key].categoryCH,
      iconHTML: category[key].iconHTML
    })
  }
  console.log('done!')
})