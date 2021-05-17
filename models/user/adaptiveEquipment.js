const mongoose = require('mongoose')

const adaptiveEquipmentSchema = new mongoose.Schema({
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

adaptiveEquipmentSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

adaptiveEquipmentSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('AdaptiveEquipment', adaptiveEquipmentSchema)
