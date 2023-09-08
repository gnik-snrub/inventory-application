const { DateTime } = require('luxon')

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PlatformSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  price: { type: Number, required: false, },
  numberInStock: { type: Number, required: true },
  summary: { type: String, required: false, maxLength: 200, minLength: 3 },
  manufacturer: { type: String, required: true, maxLength: 50, minLength: 3 },
  releaseDate: { type: Date, required: true }
})

PlatformSchema.virtual('url').get(function() {
  return `/shop/platform/${this._id}`
})

PlatformSchema.virtual('releaseDate_formatted').get(function() {
  return DateTime.fromJSDate(this.releaseDate).toLocaleString(DateTime.DATE_MED)
})

PlatformSchema.virtual('releaseDate_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.releaseDate).toISODate()
})

module.exports = mongoose.model('Platform', PlatformSchema)
