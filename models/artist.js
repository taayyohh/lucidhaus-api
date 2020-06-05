const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');


mongoose.plugin(slug);


const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
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
    slug: { type: String, slug: "name", unique: true },

})


module.exports = mongoose.model('Artist', artistSchema)