exports.index = async (req, res, next) => {
  res.render('index', { title: 'Not EB Games' })
}

exports.gameCreateGet = async(req, res, next) => {}
exports.gameCreatePost = async(req, res, next) => {}

exports.gameDeleteGet = async(req, res, next) => {}
exports.gameDeletePost = async(req, res, next) => {}

exports.gameUpdateGet = async(req, res, next) => {}
exports.gameUpdatePost = async(req, res, next) => {}

exports.gameDetail = async(req, res, next) => {}
exports.gameList = async(req, res, next) => {}
