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
<<<<<<< HEAD:features/event/models/index.js
    description: {
=======
    video: {
        type: String,
        trim: true,
    },
    photo: {
>>>>>>> a534292884f416c05e28c2c063a936980ba8dc70:models/post.js
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    dateOfEvent: {
        type: Date,
        trim: true,
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
