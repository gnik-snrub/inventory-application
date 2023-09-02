const Platform = require('../models/platform')
const Game = require('../models/game')
const Accessory = require('../models/accessory')

exports.platformCreateGet = async(req, res, next) => {}
exports.platformCreatePost = async(req, res, next) => {}

exports.platformDeleteGet = async(req, res, next) => {}
exports.platformDeletePost = async(req, res, next) => {}

exports.platformUpdateGet = async(req, res, next) => {}
exports.platformUpdatePost = async(req, res, next) => {}

exports.platformDetail = async(req, res, next) => {
  const [platform, platformGames, platformAccessories] = await Promise.all([
    Platform.findById(req.params.id).exec(),
    Game.find({platform: req.params.id}).exec(),
    Accessory.find({compatiblePlatforms: req.params.id}).exec()
  ])
  res.render('platform_detail', { title: platform.name + ' details', platform, platformGames, platformAccessories })
}
exports.platformList = async(req, res, next) => {
  const allPlatforms = await Platform.find().exec()
  res.render('platform_list', { title: 'Platform List', allPlatforms })
}
