const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug);

const placeSchema = new mongoose.Schema({
    _id: Number,
    accessibility: [{
        type: ObjectId,
        ref: 'PlaceAccessibility'
    }],
    brickAndMortar: Boolean,
    category: [{
        type: ObjectId,
        ref: 'PlaceCategory'
    }],
    communitiesServed: [{
       name: String,
       description: String
    }],
    description: {
        type: String,
        trim: true,
    },
    foodOptions: [{
        name:  String,
        description: String
    }],
    isPublished: Boolean,
    isRestaurant: Boolean,
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

}, {id: false})

//objectID necessary for algolia search
placeSchema.virtual('objectID').get(function () {
    return this._id;
})

placeSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Place', placeSchema)
