const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const raceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 32
    },
    description: {
        type: String
    },
})

raceSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

raceSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('race', raceSchema)
