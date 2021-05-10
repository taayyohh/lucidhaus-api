const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug)

const Song = new mongoose.Schema({
    audio: String,
    title: String,
    trackNumber: Number
})

const albumSchema = new mongoose.Schema({
    coverArt: {
        type: String,
        trim: true,
    },
    albumName: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    year: String,
    primaryArtist: {
        type: ObjectId,
        ref: 'Artist',
        required: true
    },
    collaborators: {
        type: ObjectId,
        ref: 'Collaborator'
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    isPublished: Boolean,
    songs: [Song],
    slug: {
        type: String,
        slug: 'albumName',
        unique: true
    },
}, {id: false})

//objectID necessary for algolia search
albumSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

albumSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Album', albumSchema)
