const Game = require('../models/game')
const Platform = require('../models/platform')
const Accessory = require('../models/accessory')
const Merchandise = require('../models/merchandise')
const Genre = require('../models/genre')
const Developer = require('../models/developer')

const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.index = asyncHandler(async (req, res, next) => {
  const [
    gameCount,
    gameStockCount,
    platformCount,
    platformStockCount,
    accessoryCount,
    accessoryStockCount,
    merchandiseCount,
    merchandiseStockCount,
    genreCount,
    developerCount,
  ] = await Promise.all([
    Game.countDocuments({}).exec(),
    Game.aggregate([{
      $group: { _id: '', numberInStock: {$sum: '$numberInStock'}
      }}, {
      $project: { _id: 0, numberInStock: '$numberInStock'
      }
    }]),
    Platform.countDocuments({}).exec(),
    Platform.aggregate([{
      $group: { _id: '', numberInStock: {$sum: '$numberInStock'}
      }}, {
      $project: { _id: 0, numberInStock: '$numberInStock'
      }
    }]),
    Accessory.countDocuments({}).exec(),
    Accessory.aggregate([{
      $group: { _id: '', numberInStock: {$sum: '$numberInStock'}
      }}, {
      $project: { _id: 0, numberInStock: '$numberInStock'
      }
    }]),
    Merchandise.countDocuments({}).exec(),
    Merchandise.aggregate([{
      $group: { _id: '', numberInStock: {$sum: '$numberInStock'}
      }}, {
      $project: { _id: 0, numberInStock: '$numberInStock'
      }
    }]),
    Genre.countDocuments({}).exec(),
    Developer.countDocuments({}).exec(),
  ])
  res.render('index', {
    title: 'Not EB Games',
    gameCount,
    gameStockCount,
    platformCount,
    platformStockCount,
    accessoryCount,
    accessoryStockCount,
    merchandiseCount,
    merchandiseStockCount,
    genreCount,
    developerCount
  })
})

exports.gameCreateGet = asyncHandler(async(req, res, next) => {
  const [allDevelopers, allGenres, allPlatforms] = await Promise.all([
    Developer.find().exec(),
    Genre.find().exec(),
    Platform.find().exec(),
  ])
  res.render('game_form', {
    title: 'Create Game',
    allDevelopers,
    allGenres,
    allPlatforms
  })
})
exports.gameCreatePost = [
  body('title', 'Game title must be between 3 and 100 characters').trim().isLength({min: 3, max: 100}),
  body('price', 'Game must have a price').notEmpty(),
  body('summary', 'Game summary must be between 3 and 200 characters').trim().isLength({min: 3, max: 200}),
  body('numberInStock', 'Game stock count must be included').notEmpty(),
  body('developer.*').escape(),
  body('genre.*').escape(),
  body('platform.*').escape(),
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)

    const game = new Game({
      title: req.body.title,
      price: req.body.price,
      summary: req.body.summary,
      numberInStock: req.body.numberInStock,
      developer: req.body.developer,
      genre: req.body.genre,
      platform: req.body.platform,
    })

    if (!errors.isEmpty()) {
      const [allDevelopers, allGenres, allPlatforms] = await Promise.all([
        Developer.find().exec(),
        Genre.find().exec(),
        Platform.find().exec(),
      ])

      for (const developer of allDevelopers) {
        if (game.compatiblePlatforms.includes(developer._id)) {
          developer.checked = 'true'
        }
      }

      for (const genre of allGenres) {
        if (game.compatiblePlatforms.includes(genre._id)) {
          genre.checked = 'true'
        }
      }

      for (const platform of allPlatforms) {
        if (game.compatiblePlatforms.includes(platform._id)) {
          platform.checked = 'true'
        }
      }

      res.render('game_form', {
        title: 'Create Game',
        errors: errors.array(),
        game,
        allDevelopers,
        allGenres,
        allPlatforms
      })
      return
    } else {
      await game.save()
      res.redirect(game.url)
    }
  })
]

exports.gameDeleteGet = asyncHandler(async(req, res, next) => {})
exports.gameDeletePost = asyncHandler(async(req, res, next) => {})

exports.gameUpdateGet = asyncHandler(async(req, res, next) => {})
exports.gameUpdatePost = asyncHandler(async(req, res, next) => {})

exports.gameDetail = asyncHandler(async(req, res, next) => {
  const [game, relatedMerchandise] = await Promise.all([
    Game.findById(req.params.id).populate('developer').populate('genre').populate('platform').exec(),
    Merchandise.find({relatedGames: req.params.id}).exec()
  ])
  res.render('game_detail', { title: game.title + ' details', game, relatedMerchandise})
})
exports.gameList = asyncHandler(async(req, res, next) => {
  const allGames = await Game.find().exec()
  res.render('game_list', { title: 'Game List', allGames})
})
