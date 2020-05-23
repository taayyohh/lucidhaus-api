const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');


mongoose.plugin(slug);

const collaboratorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        trim: true,
        required: true,
    },
    url: {
        type: String,
        trim: true,
        required: true,
    },

    slug: { type: String, slug: "name", unique: true },

})
