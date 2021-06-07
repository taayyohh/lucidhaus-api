const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const pronounSchema = new mongoose.Schema({
    name: String,
    description: String,
    subjectiveSingular: {
        type: String,
        trim: true
    },
    objectiveSingular: {
        type: String,
        trim: true
    },
    objectivePossessive: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        slug: ['name'],
        unique: true
    },
    type: {
        type: String,
        default: 'pronoun'
    }
})

pronounSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

pronounSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Pronoun', pronounSchema)
