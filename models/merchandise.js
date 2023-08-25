const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MerchandiseSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  price: { type: Number, required: true, },
  summary: { type: String, required: false, maxLength: 200, minLength: 3 },
  numberInStock: { type: Number, required: true },
  relatedGames: [{ type: Schema.Types.ObjectId, ref: 'Game', required: true }],
})

MerchandiseSchema.virtual('url').get(function() {
  return `/shop/merchandise/${this._id}`
})

module.exports = mongoose.model('Merchandise', MerchandiseSchema)
