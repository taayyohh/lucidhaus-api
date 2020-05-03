const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');


mongoose.plugin(slug);


const songSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    artist: [Artist],
    lyrics: {
        type: String,
        trim: true,
        required: true,
    },
    slug: { type: String, slug: "title", unique: true },

})


module.exports = mongoose.model('Song', songSchema)