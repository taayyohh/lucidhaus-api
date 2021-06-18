const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug);

const LocationSchema = new mongoose.Schema({
    address1: String,
    address2: String,
    city: String,
    zip: String,
    country: String,
    state: String,
    latitude: Number,
    longitude: Number,
})

const ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        default: false
    },
    safe: {
        type: Boolean,
        default: null
    },
    celebrated: {
        type: Boolean,
        default: null
    },
    welcome: {
        type: Boolean,
        default: null
    },
    photo: {
        type: String,
        trim: true
    },
    user: [{
        type: ObjectId,
        ref: 'User'
    }],
    updated: {
        type: Date,
        default: Date.now
    },
})

const placeSchema = new mongoose.Schema({
    accessibleDoorway: String,
    audioAvailable: {
        type: Boolean,
        default: null
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
        default: null
    },
    brickAndMortar: {
        type: Boolean,
        default: null
    },
    categories: [{
        type: ObjectId,
        ref: 'PlaceCategory',
    }],
    communitiesServed: [{
        type: ObjectId,
        ref: 'CommunitiesServed',
    }],
    description: String,
    foodOptions: [{
        type: ObjectId,
        ref: 'FoodOptions',
    }],
    isPublished: {
        type: Boolean,
        default: true
    },
    isRestaurant: {
        type: Boolean,
        default: null
    },
    languageSpoken: [{
        type: ObjectId,
        ref: 'Language',
    }],
    largeAdaptiveEquipment: {
        type: Boolean,
        default: null
    },
    location: [LocationSchema],
    name: {
        type: String,
        trim: true
    },
    onlyAccessibleByStairs: {
        type: Boolean,
        default: null
    },
    businessOwner: [{
        type: ObjectId,
        ref: 'BusinessOwner',
    }],
    photo: {
        type: String,
        trim: true
    },
    publicTransportation: {
        type: Boolean,
        default: null
    },
    reviews: [ReviewSchema],
    signLanguageAccessible: {
        type: Boolean,
        default: null
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    type: {
        type: String,
        default: 'place'
    },
    website: String,
    wheelchairElevator: {
        type: Boolean,
        default: null
    },
    wheelchairParking: {
        type: Boolean,
        default: null
    },
    wheelchairRamps: {
        type: Boolean,
        default: null
    },
    wheelchairRestroom: {
        type: Boolean,
        default: null
    },
}, {id: false})

//objectID necessary for algolia search
placeSchema.virtual('objectID').get(function () {
    return this._id;
})

placeSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Place', placeSchema)
