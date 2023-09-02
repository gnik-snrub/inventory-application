const Accessory = require('../models/accessory')

const asyncHandler = require('express-async-handler')

exports.accessoryCreateGet = asyncHandler(async(req, res, next) => {})
exports.accessoryCreatePost = asyncHandler(async(req, res, next) => {})

exports.accessoryDeleteGet = asyncHandler(async(req, res, next) => {})
exports.accessoryDeletePost = asyncHandler(async(req, res, next) => {})

exports.accessoryUpdateGet = asyncHandler(async(req, res, next) => {})
exports.accessoryUpdatePost = asyncHandler(async(req, res, next) => {})

exports.accessoryDetail = asyncHandler(async(req, res, next) => {
  const accessory = await Accessory.findById(req.params.id).populate('compatiblePlatforms').exec()
  res.render('accessory_detail', { title: accessory.name + ' details', accessory})
})
exports.accessoryList = asyncHandler(async(req, res, next) => {
  const allAccessories = await Accessory.find().exec()
  res.render('accessory_list', { title: 'All Accessories', allAccessories })
})
