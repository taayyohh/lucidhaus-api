const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const {ObjectId} = mongoose.Schema

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
    },
    type: {
        type: String,
        default: 'product-category'
    }
}, {
    timestamps: true,
    id: false
})

productCategorySchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

productCategorySchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('ProductCategory', productCategorySchema)
