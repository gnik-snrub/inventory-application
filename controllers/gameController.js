const Game = require('../models/game')
const Platform = require('../models/platform')
const Accessory = require('../models/accessory')
const Merchandise = require('../models/merchandise')
const Genre = require('../models/genre')
const Developer = require('../models/developer')

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

exports.gameCreateGet = asyncHandler(async(req, res, next) => {})
exports.gameCreatePost = asyncHandler(async(req, res, next) => {})

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
