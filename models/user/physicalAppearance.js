const mongoose = require('mongoose')

const physicalAppearanceSchema = new mongoose.Schema({
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

physicalAppearanceSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

physicalAppearanceSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('PhysicalAppearance', physicalAppearanceSchema)
