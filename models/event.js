const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug);

const Rsvp = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    }
})

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    flyer: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    attendees: [Rsvp],
    isPublished: Boolean
}, { id: false })

//objectID necessary for algolia search
eventSchema.virtual('objectID').get(function(){
    return this._id.toHexString();
})

eventSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Event', eventSchema)
