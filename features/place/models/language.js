const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    description: String,
    slug: {
        type: String,
        slug: 'name',
        unique: true
    }
})

languageSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

languageSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('LanguagesSpoken', languageSchema)
