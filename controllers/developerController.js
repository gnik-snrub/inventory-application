const Developer = require('../models/developer')
const Game = require('../models/game')

const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.developerCreateGet = asyncHandler(async(req, res, next) => {
  res.render('developer_form', { title: 'Create Developer'})
})
exports.developerCreatePost = [
  body('name', 'Developer name must have at least one character').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async(req, res, next) => {
    const errors = validationResult(req)

    const developer = new Developer({name: req.body.name})

    if (!errors.isEmpty()) {
      res.render('developer_form', {
        title: 'Create Developer',
        developer,
        errors: errors.array()
      })
      return
    } else {
      const developerExists = await Developer.findOne({name: req.body.name}).collation({ locale: 'en', strength: 2 }).exec()
      if (developerExists) {
        res.redirect(developerExists.url)
      } else {
        await developer.save()
        res.redirect(developer.url)
      }
    }
  })
]

exports.developerDeleteGet = asyncHandler(async(req, res, next) => {
  const [developer, allGamesWithDeveloper] = await Promise.all([
    Developer.findById(req.params.id).exec(),
    Game.find({developer: req.params.id}, 'title summary').exec()
  ])
  res.render('developer_delete', {title: 'Delete Developer', developer, allGamesWithDeveloper})
})
exports.developerDeletePost = asyncHandler(async(req, res, next) => {
  const [developer, allGamesWithDeveloper] = await Promise.all([
    Developer.findById(req.params.id).exec(),
    Game.find({developer: req.params.id}, 'title summary').exec()
  ])

  if (allGamesWithDeveloper.length > 0) {
    res.render('developer_delete', {title: 'Delete Developer', developer, allGamesWithDeveloper})
    return
  } else {
    await Developer.findByIdAndRemove(req.body.developerid)
    res.redirect('/shop/developers')
  }
})

exports.developerUpdateGet = asyncHandler(async(req, res, next) => {})
exports.developerUpdatePost = asyncHandler(async(req, res, next) => {})

exports.developerDetail = asyncHandler(async(req, res, next) => {
  const [developer, developerGames] = await Promise.all([
    Developer.findById(req.params.id).exec(),
    Game.find({developer: req.params.id}, 'title summary').exec()
  ])
  res.render('developer_detail', { title: developer.name + ' details', developer, developerGames })
})
exports.developerList = asyncHandler(async(req, res, next) => {
  const allDevelopers = await Developer.find().exec()
  res.render('developer_list', { title: 'Developer List', allDevelopers })
})
