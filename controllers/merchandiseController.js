
exports.merchandiseCreateGet = async(req, res, next) => {}
exports.merchandiseCreatePost = async(req, res, next) => {}

exports.merchandiseDeleteGet = async(req, res, next) => {}
exports.merchandiseDeletePost = async(req, res, next) => {}

exports.merchandiseUpdateGet = async(req, res, next) => {}
exports.merchandiseUpdatePost = async(req, res, next) => {}

exports.merchandiseDetail = async(req, res, next) => {}
exports.merchandiseList = async(req, res, next) => {
  const allMerchandise = await Merchandise.find().exec()
  res.render('merchandise_list', { title: 'All Merchandise', allMerchandise })
}
