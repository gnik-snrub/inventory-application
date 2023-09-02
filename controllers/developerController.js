const Developer = require('../models/developer')
const Game = require('../models/game')

const asyncHandler = require('express-async-handler')

exports.developerCreateGet = asyncHandler(async(req, res, next) => {})
exports.developerCreatePost = asyncHandler(async(req, res, next) => {})

exports.developerDeleteGet = asyncHandler(async(req, res, next) => {})
exports.developerDeletePost = asyncHandler(async(req, res, next) => {})

exports.developerUpdateGet = asyncHandler(async(req, res, next) => {})
exports.developerUpdatePost = asyncHandler(async(req, res, next) => {})

exports.developerDetail = asyncHandler(async(req, res, next) => {
  const [developer, developerGames] = await Promise.all([
    Developer.findById(req.params.id).exec(),
    Game.find({developer: req.params.id}, 'title summary').exec()
  ])
  res.render('developer_detail', { title: developer.name + ' details', developer, developerGames })
})
exports.developerList = asyncHandler(async(req, res, next) => {
  const allDevelopers = await Developer.find().exec()
  res.render('developer_list', { title: 'Developer List', allDevelopers })
})
