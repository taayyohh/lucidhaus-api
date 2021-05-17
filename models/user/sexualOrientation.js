const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const sexualOrientationSchema = new mongoose.Schema({
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

sexualOrientationSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

sexualOrientationSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('SexualOrientation', sexualOrientationSchema)
