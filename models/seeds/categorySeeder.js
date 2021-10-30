const db = require('../../config/mongoose')
const Category = require('../category')
const categoryJson = require('../../config/category.json')


db.once('open', () => {
  categoryJson.forEach(category => Category.create({
    categoryId: category.categoryId,
    categoryCH: category.categoryCH,
    iconHTML: category.iconHTML
  }))
  console.log('Category done!')
})