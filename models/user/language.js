const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 32
    },
    description: {
        type: String
    }
})

languageSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

languageSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Language', languageSchema)
