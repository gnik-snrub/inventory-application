
exports.developerCreateGet = async(req, res, next) => {}
exports.developerCreatePost = async(req, res, next) => {}

exports.developerDeleteGet = async(req, res, next) => {}
exports.developerDeletePost = async(req, res, next) => {}

exports.developerUpdateGet = async(req, res, next) => {}
exports.developerUpdatePost = async(req, res, next) => {}

exports.developerDetail = async(req, res, next) => {}
exports.developerList = async(req, res, next) => {
  const allDevelopers = await Developer.find().exec()
  res.render('developer_list', { title: 'Developer List', allDevelopers })
}
