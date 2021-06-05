const mongoose = require('mongoose')

const bodyModificationSchema = new mongoose.Schema({
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

bodyModificationSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

bodyModificationSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('BodyModifications', bodyModificationSchema)
