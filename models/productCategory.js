const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const productCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxLength: 32
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('ProductCategory', productCategorySchema)