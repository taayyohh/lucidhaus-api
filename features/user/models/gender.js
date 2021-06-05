const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug)

const genderSchema = new mongoose.Schema({
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

genderSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

genderSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Gender', genderSchema)
