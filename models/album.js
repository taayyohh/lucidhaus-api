const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');


mongoose.plugin(slug);

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    audio: {
        data: Buffer,
        contentType: 'String'
    },
    lyrics: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },

})



const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxLength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: 'String'
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    songs: [songSchema],

})


module.exports = mongoose.model('Album', albumSchema)