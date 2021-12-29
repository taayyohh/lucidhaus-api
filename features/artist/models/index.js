const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug);

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    photo: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    isPublished: Boolean
}, { id: false })

//objectID necessary for algolia search
artistSchema.virtual('objectID').get(function(){
    return this._id.toHexString();
})

artistSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Artist', artistSchema)
