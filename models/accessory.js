const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AccessorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  price: { type: Number, required: true, },
  summary: { type: String, required: false, maxLength: 200, minLength: 3 },
  numberInStock: { type: Number, required: true },
  compatiblePlatforms: [{ type: Schema.Types.ObjectId, ref: 'Platform', required: true }]
})

AccessorySchema.virtual('url').get(function() {
  return `/shop/accessory/${this._id}`
})

module.exports = mongoose.model('Accessory', AccessorySchema)
