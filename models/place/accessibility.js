const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)



const accessibilitySchema = new mongoose.Schema({
    largeAdaptiveEquipment: Boolean,
    wheelchairRamps: Boolean,
    onlyAccessibleByStairs: Boolean,
    
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

accessibilitySchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

accessibilitySchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('PlaceAccessibility', accessibilitySchema)
