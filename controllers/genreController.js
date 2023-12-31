const Genre = require('../models/genre')
const Game = require('../models/game')

const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.genreCreateGet = asyncHandler(async(req, res, next) => {
  res.render('genre_form', { title: 'Create Genre' })
})
exports.genreCreatePost = [
  body('name', 'Genre name must have at least one character').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)

    const genre = new Genre({name: req.body.name})

    if(!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Create Genre',
        genre,
        errors: errors.array()
      })
      return
    } else {
      const genreExists = await Genre.findOne({name: req.body.name}).collation({ locale: 'en', strength: 2 }).exec()
      if (genreExists) {
        res.redirect(genreExists.url)
      } else {
        await genre.save()
        res.redirect(genre.url)
      }
    }
  })
]

exports.genreDeleteGet = asyncHandler(async(req, res, next) => {
  const [genre, allGamesWithGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Game.find({genre: req.params.id}, 'title summary').exec()
  ])
  res.render('genre_delete', {title: 'Delete Genre', genre, allGamesWithGenre})
})
exports.genreDeletePost = asyncHandler(async(req, res, next) => {
  const [genre, allGamesWithGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Game.find({genre: req.params.id}, 'title summary').exec()
  ])

  if (allGamesWithGenre.length > 0) {
    res.render('genre_delete', {title: 'Delete Genre', genre, allGamesWithGenre})
    return
  } else {
    await Genre.findByIdAndRemove(req.body.genreid)
    res.redirect('/shop/genres')
  }
})

exports.genreUpdateGet = asyncHandler(async(req, res, next) => {
  const genre = await Genre.findById(req.params.id)
  res.render('genre_form', { title: 'Update Genre', genre})
})
exports.genreUpdatePost = [
  body('name', 'Genre name must have at least one character').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)

    const genre = new Genre({name: req.body.name, _id: req.params.id})

    if(!errors.isEmpty()) {
      res.render('genre_form', {
        title: 'Create Genre',
        genre,
        errors: errors.array()
      })
      return
    } else {
      await Genre.findByIdAndUpdate(req.params.id, genre)
      res.redirect(genre.url)
    }
  })
]

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
