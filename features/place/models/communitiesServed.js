const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const communitiesServedSchema = new mongoose.Schema({
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

communitiesServedSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

communitiesServedSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('CommunitiesServed', communitiesServedSchema)
