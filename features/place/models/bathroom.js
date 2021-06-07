const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const bathroomSchema = new mongoose.Schema({
    name: String,
    description: String,
    gender: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    multiStall: Boolean,
    toilets: Boolean,
    urinals: Boolean,
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    type: {
        type: String,
        default: 'bathroom'
    }
})

bathroomSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

bathroomSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Bathroom', bathroomSchema)
