const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId, Types} = mongoose.Schema

mongoose.plugin(slug);

const geoJsonProperties = new mongoose.Schema({
    address: String,
    address2: String,
    city: String,
    country: {
        type: String,
        default: 'United States'
    },
    crossStreet: String,
    description: String,
    hours: {},
    phoneFormatted: String,
    phone: String,
    postalCode: String,
    state: String,
    name: String,
});

const viewsSchema = new mongoose.Schema({
    viewedBy: {
        type: ObjectId,
        ref: 'User'
    },
    viewedAt: Number
});

const placeSchema = new mongoose.Schema({
    accessibleDoorway: String,
    audioAvailable: {
        type: Boolean,
        default: false
    },
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
        unique: true,
        sparse: true
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
    // categories: [{
    //     type: ObjectId,
    //     ref: 'PlaceCategory',
    //     default: () => {
    //         return null
    //     }
    // }],
    categories: [],
    communitiesServed: [{
        type: ObjectId,
        ref: 'CommunitiesServed',
    }],
    description: String,
    foodOptions: [{
        type: ObjectId,
        ref: 'FoodOptions',
    }],
    hours: {},
    geojson: [
        {
            type: {
                type: String,
                default: 'Features'
            },
            geometry: {
                type: {
                    type: String,
                    default: 'Point'
                },
                coordinates: []
            },
            properties: {
                type: geoJsonProperties,
                default: {}
            }
        }
    ],
    isPendingSubmission: {
        type: Boolean,
        default: false
    },
    isRestaurant: {
        type: Boolean,
        default: false
    },
    inclusiveScore: {
        type: Number,
        default: 0
    },
    languageSpoken: [{
        type: ObjectId,
        ref: 'Language',
    }],
    largeAdaptiveEquipment: {
        type: Boolean,
        default: false
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
        slug: ["name", 'geojson.0.properties.address', 'geojson.0.properties.city', 'geojson.0.properties.state'],
        unique: true,
        permanent: true
    },
    submittedBy: [{
        type: ObjectId,
        ref: 'User',
    }],
    type: {
        type: String,
        default: 'place'
    },
    views: [{
        viewedBy: {
            type: ObjectId,
            ref: 'User'
        },
        viewedAt: Number
    }],
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
