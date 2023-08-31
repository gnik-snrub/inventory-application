const Genre = require('../models/genre')

exports.genreCreateGet = async(req, res, next) => {}
exports.genreCreatePost = async(req, res, next) => {}

exports.genreDeleteGet = async(req, res, next) => {}
exports.genreDeletePost = async(req, res, next) => {}

exports.genreUpdateGet = async(req, res, next) => {}
exports.genreUpdatePost = async(req, res, next) => {}

exports.genreDetail = async(req, res, next) => {}
exports.genreList = async(req, res, next) => {
  const allGenres = await Genre.find().exec()
  res.render('genre_list', { title: 'Genre List', allGenres })
}
