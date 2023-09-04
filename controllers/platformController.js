const Platform = require('../models/platform')
const Game = require('../models/game')
const Accessory = require('../models/accessory')

const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.platformCreateGet = asyncHandler(async(req, res, next) => {
  res.render('platform_form', { title: 'Create Platform' })
})
exports.platformCreatePost = [
  body('name', 'Platform name must not be empty').trim().isLength({ min: 1 }),
  body('price', 'Platform price cannot be less than 1').notEmpty().isInt({ min: 1 }),
  body('numberInStock', 'Platform in stock must not be empty').notEmpty(),
  body('manufacturer', 'Platform manufacturer must be included').notEmpty(),
  body('summary', 'Platform summary must not be empty').trim().isLength({ min: 1 }),
  body('releaseDate', 'Invalid date').isISO8601().toDate(),
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)

    const platform = new Platform({
      name: req.body.name,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      summary: req.body.summary,
      manufacturer: req.body.manufacturer,
      releaseDate: req.body.releaseDate
    })

    if (!errors.isEmpty()) {
      res.render('platform_form', {
        title: 'Create Platform',
        platform,
        errors: errors.array()
      })
      return
    } else {
      await platform.save()
      res.redirect(platform.url)
    }
  })
]

exports.platformDeleteGet = asyncHandler(async(req, res, next) => {})
exports.platformDeletePost = asyncHandler(async(req, res, next) => {})

exports.platformUpdateGet = asyncHandler(async(req, res, next) => {})
exports.platformUpdatePost = asyncHandler(async(req, res, next) => {})

exports.platformDetail = asyncHandler(async(req, res, next) => {
  const [platform, platformGames, platformAccessories] = await Promise.all([
    Platform.findById(req.params.id).exec(),
    Game.find({platform: req.params.id}).exec(),
    Accessory.find({compatiblePlatforms: req.params.id}).exec()
  ])
  res.render('platform_detail', { title: platform.name + ' details', platform, platformGames, platformAccessories })
})
exports.platformList = asyncHandler(async(req, res, next) => {
  const allPlatforms = await Platform.find().exec()
  res.render('platform_list', { title: 'Platform List', allPlatforms })
})
