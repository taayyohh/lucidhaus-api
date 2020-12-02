const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Post', postSchema)