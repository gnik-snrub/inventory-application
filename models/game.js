const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GameSchema = new Schema({
  title: { type: String, required: true, maxLength: 100, minLength: 3 },
  price: { type: Number, required: true, },
  summary: { type: String, required: false, maxLength: 200, minLength: 3 },
  numberInStock: { type: Number, required: true },
  developer: [{ type: Schema.Types.ObjectId, ref: 'Developer', required: true }],
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
  platform: [{ type: Schema.Types.ObjectId, ref: 'Platform', required: true }]
})

GameSchema.virtual('url').get(function() {
  return `/shop/game/${this._id}`
})

module.exports = mongoose.model('Game', GameSchema)
