const Game = require('../models/game')
const Platform = require('../models/platform')
const Accessory = require('../models/accessory')
const Merchandise = require('../models/merchandise')
const Genre = require('../models/genre')
const Developer = require('../models/developer')

exports.index = async (req, res, next) => {
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
}

exports.gameCreateGet = async(req, res, next) => {}
exports.gameCreatePost = async(req, res, next) => {}

exports.gameDeleteGet = async(req, res, next) => {}
exports.gameDeletePost = async(req, res, next) => {}

exports.gameUpdateGet = async(req, res, next) => {}
exports.gameUpdatePost = async(req, res, next) => {}

exports.gameDetail = async(req, res, next) => {
  const game = await Game.findById(req.params.id)
    .populate('developer')
    .populate('genre')
    .populate('platform')
    .exec()
  res.render('game_detail', { title: game.title + ' details', game})
}
exports.gameList = async(req, res, next) => {
  const allGames = await Game.find().exec()
  res.render('game_list', { title: 'Game List', allGames})
}
