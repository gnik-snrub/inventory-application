const Genre = require('../models/genre')
const Game = require('../models/game')

const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.genreCreateGet = asyncHandler(async(req, res, next) => {
})


exports.genreDeleteGet = asyncHandler(async(req, res, next) => {})
exports.genreDeletePost = asyncHandler(async(req, res, next) => {})

exports.genreUpdateGet = asyncHandler(async(req, res, next) => {})
exports.genreUpdatePost = asyncHandler(async(req, res, next) => {})

exports.genreDetail = asyncHandler(async(req, res, next) => {
  const [genre, genreGames] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Game.find({ genre: req.params.id }, 'title summary').exec()
  ])
  res.render('genre_detail', { title: genre.name + ' details', genre, genreGames})
})
exports.genreList = asyncHandler(async(req, res, next) => {
  const allGenres = await Genre.find().exec()
  res.render('genre_list', { title: 'Genre List', allGenres })
})
