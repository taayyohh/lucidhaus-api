const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const foodOptionsSchema = new mongoose.Schema({
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

foodOptionsSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

foodOptionsSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('FoodOptions', foodOptionsSchema)
