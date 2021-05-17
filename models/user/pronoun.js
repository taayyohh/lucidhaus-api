const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug)

const pronounSchema = new mongoose.Schema({
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
})

pronounSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

pronounSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Pronoun', pronounSchema)
