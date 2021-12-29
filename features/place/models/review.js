const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId, Types} = mongoose.Schema

mongoose.plugin(slug);

const ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        default: false,
        maxLength: 5000
    },
    reviewerAvatar: String,
    reviewerName: {
        type: String,
        default: 'LucidHaus Reviewer',
        maxLength: 500
    },
    safe: [],
    celebrated: [],
    welcome: [],
    photo: {
        type: String,
        trim: true
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    place: {
        type: ObjectId,
        ref: 'Place'
    },
    placeName: {
        type: String,
        trim: true
    },
    placeSlug: {
        type: String,
        trim: true
    },
    report: [{
        flaggedBy: {
            type: ObjectId,
            ref: 'User'
        },
        reason: String,
    }],
    updated: {
        type: Date,
        default: Date.now
    },
    isFlagged: {
        type: Boolean,
        default: false
    },
    flaggedBy: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ]
})

//objectID necessary for algolia search
ReviewSchema.virtual('objectID').get(function () {
    return this._id;
})

ReviewSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Review', ReviewSchema)
