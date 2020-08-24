const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const businessSchema = new mongoose.Schema({
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
        data: Buffer,
        contentType: 'String'
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },

})

module.exports = mongoose.model('Business', businessSchema)