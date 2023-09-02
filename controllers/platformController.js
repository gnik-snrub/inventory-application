const Platform = require('../models/platform')

exports.platformCreateGet = async(req, res, next) => {}
exports.platformCreatePost = async(req, res, next) => {}

exports.platformDeleteGet = async(req, res, next) => {}
exports.platformDeletePost = async(req, res, next) => {}

exports.platformUpdateGet = async(req, res, next) => {}
exports.platformUpdatePost = async(req, res, next) => {}

exports.platformDetail = async(req, res, next) => {}
exports.platformList = async(req, res, next) => {}
exports.platformList = async(req, res, next) => {
  const allPlatforms = await Platform.find().exec()
  res.render('platform_list', { title: 'Platform List', allPlatforms })
}
