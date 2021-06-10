const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug);

const placeSchema = new mongoose.Schema({
    _id: Number,
    accessibleDoorway: String,
    audioAvailable: Boolean,
    braille: Boolean,
    description: String,
    largeAdaptiveEquipment: Boolean,
    onlyAccessibleByStairs: Boolean,
    signLanguageAccessible: Boolean,
    wheelchairElevator: Boolean,
    wheelchairParking: Boolean,
    wheelchairRamps: Boolean,
    wheelchairRestroom: Boolean,
    bathrooms: [{
        type: ObjectId,
        ref: 'Bathroom'
    }],
    brickAndMortar: Boolean,
    categories: [{
        type: ObjectId,
        ref: 'PlaceCategory'
    }],
    communitiesServed: [{
        type: ObjectId,
        ref: 'CommunitiesServed'
    }],
    description: {
        type: String,
        trim: true,
    },
    foodOptions: [{
        type: ObjectId,
        ref: 'FoodOptions'
    }],
    isPublished: Boolean,
    isRestaurant: Boolean,
    languages: [{
        type: ObjectId,
        ref: 'Language'
    }],
    name: {
        type: String,
        trim: true
    },
    owners: [{
        type: ObjectId,
        ref: 'BusinessOwner'
    }],
    photo: {
        type: String,
        trim: true
    },
    publicTransportation: Boolean,
    slug: {
        type: String,
        slug: "name",
    },
    website: String,
    type: {
        type: String,
        default: 'place'
    }
}, {id: false})

//objectID necessary for algolia search
placeSchema.virtual('objectID').get(function () {
    return this._id;
})

placeSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Place', placeSchema)
