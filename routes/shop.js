var express = require('express');
var router = express.Router();

const gameController = require('../controllers/gameController')
const genreController = require('../controllers/genreController')
const developerController = require('../controllers/developerController')
const platformController = require('../controllers/platformController')
const accessoryController = require('../controllers/accessoryController')
const merchandiseController = require('../controllers/merchandiseController')

// Home page

router.get('/', gameController.index)

// Game pages

router.get('/game/create', gameController.gameCreateGet)
router.post('/game/create', gameController.gameCreatePost)

router.get('/game/:id/delete', gameController.gameDeleteGet)
router.post('/game/:id/delete', gameController.gameDeletePost)

router.get('/game/:id/update', gameController.gameUpdateGet)
router.post('/game/:id/update', gameController.gameUpdatePost)

router.get('/game/:id', gameController.gameDetail)
router.get('/games', gameController.gameList)

// Genre pages

router.get('/genre/create', genreController.genreCreateGet)
router.post('/genre/create', genreController.genreCreatePost)

router.get('/genre/:id/delete', genreController.genreDeleteGet)
router.post('/genre/:id/delete', genreController.genreDeletePost)

router.get('/genre/:id/update', genreController.genreUpdateGet)
router.post('/genre/:id/update', genreController.genreUpdatePost)

router.get('/genre/:id', genreController.genreDetail)
router.get('/genres', genreController.genreList)

// Developer pages

router.get('/developer/create', developerController.developerCreateGet)
router.post('/developer/create', developerController.developerCreatePost)

router.get('/developer/:id/delete', developerController.developerDeleteGet)
router.post('/developer/:id/delete', developerController.developerDeletePost)

router.get('/developer/:id/update', developerController.developerUpdateGet)
router.post('/developer/:id/update', developerController.developerUpdatePost)

router.get('/developer/:id', developerController.developerDetail)
router.get('/developers', developerController.developerList)

// Platform pages

router.get('/platform/create', platformController.platformCreateGet)
router.post('/platform/create', platformController.platformCreatePost)

router.get('/platform/:id/delete', platformController.platformDeleteGet)
router.post('/platform/:id/delete', platformController.platformDeletePost)

router.get('/platform/:id/update', platformController.platformUpdateGet)
router.post('/platform/:id/update', platformController.platformUpdatePost)

router.get('/platform/:id', platformController.platformDetail)
router.get('/platforms', platformController.platformList)

// Accessory pages

router.get('/accessory/create', accessoryController.accessoryCreateGet)
router.post('/accessory/create', accessoryController.accessoryCreatePost)

router.get('/accessory/:id/delete', accessoryController.accessoryDeleteGet)
router.post('/accessory/:id/delete', accessoryController.accessoryDeletePost)

router.get('/accessory/:id/update', accessoryController.accessoryUpdateGet)
router.post('/accessory/:id/update', accessoryController.accessoryUpdatePost)

router.get('/accessory/:id', accessoryController.accessoryDetail)
router.get('/accessories', accessoryController.accessoryList)

// Merchandise pages

router.get('/merchandise/create', merchandiseController.merchandiseCreateGet)
router.post('/merchandise/create', merchandiseController.merchandiseCreatePost)

router.get('/merchandise/:id/delete', merchandiseController.merchandiseDeleteGet)
router.post('/merchandise/:id/delete', merchandiseController.merchandiseDeletePost)

router.get('/merchandise/:id/update', merchandiseController.merchandiseUpdateGet)
router.post('/merchandise/:id/update', merchandiseController.merchandiseUpdatePost)

router.get('/merchandise/:id', merchandiseController.merchandiseDetail)
router.get('/merchandises', merchandiseController.merchandiseList)

module.exports = router
