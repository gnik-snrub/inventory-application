const Accessory = require('../models/accessory')
const Platform = require('../models/platform')

const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.accessoryCreateGet = asyncHandler(async(req, res, next) => {
  const platforms = await Platform.find().exec()
  res.render('accessory_form', { title: 'Create Accessory', platforms})
})
exports.accessoryCreatePost = [
  body('name', 'Accessory name must be between 3 and 100 characters').trim().isLength({ min: 3, max: 100 }),
  body('price', 'Accessory must have price higher than 0').notEmpty(),
  body('numberInStock', 'Accessory stock count must be included').notEmpty(),
  body('summary', 'Accessory summary must have between 3 and 200 characters').trim().isLength({ min: 3, max: 200 }),
  body('compatiblePlatforms.*').escape(),
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)

    const accessory = new Accessory({
      name: req.body.name,
      price: req.body.price,
      summary: req.body.summary,
      numberInStock: req.body.numberInStock,
      compatiblePlatforms: req.body.compatiblePlatforms
    })

    if (!errors.isEmpty()) {
      const platforms = await Platform.find().exec()

      for (const platform of platforms) {
        if (accessory.compatiblePlatforms.includes(platform._id)) {
          platform.checked = 'true'
        }
      }

      res.render('accessory_form', {
        title: 'Create Accessory',
        platforms,
        accessory,
        errors: errors.array()
      })
      return
    } else {
      await accessory.save()
      res.redirect(accessory.url)
    }
  })
]

exports.accessoryDeleteGet = asyncHandler(async(req, res, next) => {
  const accessory = await Accessory.findById(req.params.id).exec()
  res.render('accessory_delete', {title: 'Delete Accessory', accessory})
})
exports.accessoryDeletePost = asyncHandler(async(req, res, next) => {
  await Accessory.findByIdAndRemove(req.body.accessoryid)
  res.redirect('/shop/accessories')
})

exports.accessoryUpdateGet = asyncHandler(async(req, res, next) => {})
exports.accessoryUpdatePost = asyncHandler(async(req, res, next) => {})

exports.accessoryDetail = asyncHandler(async(req, res, next) => {
  const accessory = await Accessory.findById(req.params.id).populate('compatiblePlatforms').exec()
  res.render('accessory_detail', { title: accessory.name + ' details', accessory})
})
exports.accessoryList = asyncHandler(async(req, res, next) => {
  const allAccessories = await Accessory.find().exec()
  res.render('accessory_list', { title: 'All Accessories', allAccessories })
})
