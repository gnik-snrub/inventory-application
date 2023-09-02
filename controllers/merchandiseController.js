const Merchandise = require('../models/merchandise')

exports.merchandiseCreateGet = async(req, res, next) => {}
exports.merchandiseCreatePost = async(req, res, next) => {}

exports.merchandiseDeleteGet = async(req, res, next) => {}
exports.merchandiseDeletePost = async(req, res, next) => {}

exports.merchandiseUpdateGet = async(req, res, next) => {}
exports.merchandiseUpdatePost = async(req, res, next) => {}

exports.merchandiseDetail = async(req, res, next) => {
  const merchandise = await Merchandise.findById(req.params.id).populate('relatedGames').exec()
  res.render('merchandise_detail', { title: merchandise.name + ' details', merchandise})
}
exports.merchandiseList = async(req, res, next) => {
  const allMerchandise = await Merchandise.find().exec()
  res.render('merchandise_list', { title: 'All Merchandise', allMerchandise })
}
