const Genre = require('../models/genre')
const Game = require('../models/game')

exports.genreCreateGet = async(req, res, next) => {}
exports.genreCreatePost = async(req, res, next) => {}

exports.genreDeleteGet = async(req, res, next) => {}
exports.genreDeletePost = async(req, res, next) => {}

exports.genreUpdateGet = async(req, res, next) => {}
exports.genreUpdatePost = async(req, res, next) => {}

exports.genreDetail = async(req, res, next) => {
  const [genre, genreGames] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Game.find({ genre: req.params.id }, 'title summary').exec()
  ])
  res.render('genre_detail', { title: genre.name + ' details', genre, genreGames})
}
exports.genreList = async(req, res, next) => {
  const allGenres = await Genre.find().exec()
  res.render('genre_list', { title: 'Genre List', allGenres })
}
