const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId} = mongoose.Schema


mongoose.plugin(slug);


const placeSchema = new mongoose.Schema({
    _id: { type: Number },
    booneId: {},
    boonePlace: {},
    description: {
        type: String,
        trim: true,
    },
    isPublished: Boolean,
    name: {
        type: String,
        trim: true
    },
    photo: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        slug: "name",
    },

}, { id: false })

//objectID necessary for algolia search
placeSchema.virtual('objectID').get(function(){
    return this._id;
})

placeSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Place', placeSchema)