const Platform = require('../models/platform')
const Game = require('../models/game')
const Accessory = require('../models/accessory')

const asyncHandler = require('express-async-handler')

exports.platformCreateGet = asyncHandler(async(req, res, next) => {})
exports.platformCreatePost = asyncHandler(async(req, res, next) => {})

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
