const Merchandise = require('../models/merchandise')

const asyncHandler = require('express-async-handler')

exports.merchandiseCreateGet = asyncHandler(async(req, res, next) => {})
exports.merchandiseCreatePost = asyncHandler(async(req, res, next) => {})

exports.merchandiseDeleteGet = asyncHandler(async(req, res, next) => {})
exports.merchandiseDeletePost = asyncHandler(async(req, res, next) => {})

exports.merchandiseUpdateGet = asyncHandler(async(req, res, next) => {})
exports.merchandiseUpdatePost = asyncHandler(async(req, res, next) => {})

exports.merchandiseDetail = asyncHandler(async(req, res, next) => {
  const merchandise = await Merchandise.findById(req.params.id).populate('relatedGames').exec()
  res.render('merchandise_detail', { title: merchandise.name + ' details', merchandise})
})
exports.merchandiseList = asyncHandler(async(req, res, next) => {
  const allMerchandise = await Merchandise.find().exec()
  res.render('merchandise_list', { title: 'All Merchandise', allMerchandise })
})
