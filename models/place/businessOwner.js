const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const businessOwnerSchema = new mongoose.Schema({
    avatar: String,
    bio: String,
    email: String,
    identity: {
        type: ObjectId,
        ref: 'Identity',
    },
    name: String,
    tel: String
})

businessOwnerSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

businessOwnerSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('BusinessOwner', businessOwnerSchema)
