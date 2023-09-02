const Accessory = require('../models/accessory')

exports.accessoryCreateGet = async(req, res, next) => {}
exports.accessoryCreatePost = async(req, res, next) => {}

exports.accessoryDeleteGet = async(req, res, next) => {}
exports.accessoryDeletePost = async(req, res, next) => {}

exports.accessoryUpdateGet = async(req, res, next) => {}
exports.accessoryUpdatePost = async(req, res, next) => {}

exports.accessoryDetail = async(req, res, next) => {
  const accessory = await Accessory.findById(req.params.id).populate('compatiblePlatforms').exec()
  res.render('accessory_detail', { title: accessory.name + ' details', accessory})
}
exports.accessoryList = async(req, res, next) => {
  const allAccessories = await Accessory.find().exec()
  res.render('accessory_list', { title: 'All Accessories', allAccessories })
}
