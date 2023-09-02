const Developer = require('../models/developer')
const Game = require('../models/game')

exports.developerCreateGet = async(req, res, next) => {}
exports.developerCreatePost = async(req, res, next) => {}

exports.developerDeleteGet = async(req, res, next) => {}
exports.developerDeletePost = async(req, res, next) => {}

exports.developerUpdateGet = async(req, res, next) => {}
exports.developerUpdatePost = async(req, res, next) => {}

exports.developerDetail = async(req, res, next) => {
  const [developer, developerGames] = await Promise.all([
    Developer.findById(req.params.id).exec(),
    Game.find({developer: req.params.id}, 'title summary').exec()
  ])
  res.render('developer_detail', { title: developer.name + ' details', developer, developerGames })
}
exports.developerList = async(req, res, next) => {
  const allDevelopers = await Developer.find().exec()
  res.render('developer_list', { title: 'Developer List', allDevelopers })
}
