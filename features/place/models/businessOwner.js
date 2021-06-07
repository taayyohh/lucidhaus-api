const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const businessOwnerSchema = new mongoose.Schema({
    avatar: String,
    description: String,
    email: String,
    identity: {
        type: ObjectId,
        ref: 'Identity',
    },
    name: String,
    tel: String,
    type: {
        type: String,
        default: 'business-owner'
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
})

businessOwnerSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

businessOwnerSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('BusinessOwner', businessOwnerSchema)
