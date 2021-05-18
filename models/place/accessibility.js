const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)



const accessibilitySchema = new mongoose.Schema({
    accessibleDoorway: String,
    audioAvailable: Boolean,
    braille: Boolean,
    description: String,
    largeAdaptiveEquipment: Boolean,
    name: String,
    onlyAccessibleByStairs: Boolean,
    signLanguageAccessible: Boolean,
    wheelchairElevator: Boolean,
    wheelchairParking: Boolean,
    wheelchairRamps: Boolean,
    wheelchairRestroom: Boolean,


})

accessibilitySchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

accessibilitySchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('PlaceAccessibility', accessibilitySchema)
