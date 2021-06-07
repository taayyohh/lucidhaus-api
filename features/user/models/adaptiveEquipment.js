const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const adaptiveEquipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 32
    },
    description: {
        type: String
    },
    slug: {
        type: String,
        slug: ["name"],
        unique: true
    },
    type: {
        type: String,
        default: 'adaptive-equipment'
    }
})

adaptiveEquipmentSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

adaptiveEquipmentSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('AdaptiveEquipment', adaptiveEquipmentSchema)
