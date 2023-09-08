const Merchandise = require('../models/merchandise')
const Game = require('../models/game')

const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.merchandiseCreateGet = asyncHandler(async(req, res, next) => {
  const allGames = await Game.find().exec()
  res.render('merchandise_form', { title: 'Create Merchandise', allGames })
})
exports.merchandiseCreatePost = [
  body('name', 'Title must have between 3 and 100 characters').trim().isLength({min: 3, max: 100}),
  body('price', 'Merchandise must have a price').notEmpty(),
  body('summary', 'Merchandise must have between 3 and 200 characters').trim().isLength({min: 3, max: 200}),
  body('numberInStock', 'Merchandise stock count must be included').notEmpty(),
  body('relatedGames.*').escape(),
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)

    const merchandise = new Merchandise({
      name: req.body.name,
      price: req.body.price,
      summary: req.body.summary,
      numberInStock: req.body.numberInStock,
      relatedGames: req.body.relatedGames,
    })

    if (!errors.isEmpty()) {
      const allGames = await Game.find().exec()

      for (const game of allGames) {
        if (merchandise.relatedGames.includes(game._id)) {
          game.checked = 'true'
        }
      }

      res.render('merchandise_form', {
        title: 'Create Merchandise',
        errors: errors.array(),
        allGames,
        merchandise
      })
      return
    } else {
      await merchandise.save()
      res.redirect(merchandise.url)
    }
  })
]

exports.merchandiseDeleteGet = asyncHandler(async(req, res, next) => {
  const merchandise = await Merchandise.findById(req.params.id).exec()
  res.render('merchandise_delete', {title: 'Delete Merchandise', merchandise})
})
exports.merchandiseDeletePost = asyncHandler(async(req, res, next) => {
  await Merchandise.findByIdAndRemove(req.body.merchandiseid)
  res.redirect('/shop/merchandises')
})

exports.merchandiseUpdateGet = asyncHandler(async(req, res, next) => {
  const [merchandise, allGames] = await Promise.all([
    Merchandise.findById(req.params.id),
    Game.find()
  ])
  for (const game of allGames) {
    if (merchandise.relatedGames.includes(game._id)) {
      game.checked = 'true'
    }
  }
  res.render('merchandise_form', { title: 'Update Merchandise', merchandise, allGames })
})
exports.merchandiseUpdatePost = [
  body('name', 'Title must have between 3 and 100 characters').trim().isLength({min: 3, max: 100}),
  body('price', 'Merchandise must have a price').notEmpty(),
  body('summary', 'Merchandise must have between 3 and 200 characters').trim().isLength({min: 3, max: 200}),
  body('numberInStock', 'Merchandise stock count must be included').notEmpty(),
  body('relatedGames.*').escape(),
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)

    const merchandise = new Merchandise({
      name: req.body.name,
      price: req.body.price,
      summary: req.body.summary,
      numberInStock: req.body.numberInStock,
      relatedGames: req.body.relatedGames,
      _id: req.params.id
    })

    if (!errors.isEmpty()) {
      const allGames = await Game.find().exec()

      for (const game of allGames) {
        if (merchandise.relatedGames.includes(game._id)) {
          game.checked = 'true'
        }
      }

      res.render('merchandise_form', {
        title: 'Create Merchandise',
        errors: errors.array(),
        allGames,
        merchandise
      })
      return
    } else {
      await Merchandise.findByIdAndUpdate(req.params.id, merchandise)
      res.redirect(merchandise.url)
    }
  })
]

exports.merchandiseDetail = asyncHandler(async(req, res, next) => {
  const merchandise = await Merchandise.findById(req.params.id).populate('relatedGames').exec()
  res.render('merchandise_detail', { title: merchandise.name + ' details', merchandise})
})
exports.merchandiseList = asyncHandler(async(req, res, next) => {
  const allMerchandise = await Merchandise.find().exec()
  res.render('merchandise_list', { title: 'All Merchandise', allMerchandise })
})
