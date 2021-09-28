const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId, Types} = mongoose.Schema

mongoose.plugin(slug);

const placeSchema = new mongoose.Schema({
    accessibleDoorway: String,
    audioAvailable: {
        type: Boolean,
        default: false
    },
    address1: String,
    address2: String,
    averageSafe: {
        type: 'Number',
        default: 0
    },
    averageCelebrated: {
        type: 'Number',
        default: 0
    },
    averageWelcome: {
        type: 'Number',
        default: 0
    },
    bathrooms: [{
        type: ObjectId,
        ref: 'Bathroom'
    }],
    booneId: {
        type: 'Number',
        unique: true
    },
    braille: {
        type: Boolean,
        default: false
    },
    brickAndMortar: {
        type: Boolean,
        default: false
    },
    businessOwner: [{
        type: ObjectId,
        ref: 'BusinessOwner',
    }],
    categories: [{
        type: ObjectId,
        ref: 'PlaceCategory',
    }],
    city: String,
    communitiesServed: [{
        type: ObjectId,
        ref: 'CommunitiesServed',
    }],
    country: String,
    description: String,
    foodOptions: [{
        type: ObjectId,
        ref: 'FoodOptions',
    }],
    isPendingSubmission: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isRestaurant: {
        type: Boolean,
        default: false
    },
    languageSpoken: [{
        type: ObjectId,
        ref: 'Language',
    }],
    largeAdaptiveEquipment: {
        type: Boolean,
        default: false
    },
    latitude: {
        type: 'Number',
        default: null
    },
    longitude: {
        type: 'Number',
        default: null
    },
    name: {
        type: String,
        trim: true
    },
    onlyAccessibleByStairs: {
        type: Boolean,
        default: false
    },
    photo: {
        type: String,
        trim: true
    },
    publicTransportation: {
        type: Boolean,
        default: false
    },
    reviews: [{
        type: ObjectId,
        ref: 'Review'
    }],
    signLanguageAccessible: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    state: String,
    submittedBy: {
        type: ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        default: 'place'
    },
    website: String,
    wheelchairElevator: {
        type: Boolean,
        default: false
    },
    wheelchairParking: {
        type: Boolean,
        default: false
    },
    wheelchairRamps: {
        type: Boolean,
        default: false
    },
    wheelchairRestroom: {
        type: Boolean,
        default: false
    },
    zip: String
}, {id: false})

//objectID necessary for algolia search
placeSchema.virtual('objectID').get(function () {
    return this._id;
})

placeSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Place', placeSchema)
