const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    photo: {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxLength: 32
    },
    internationalShippingCost: {
        type: Number,
        trim: true,
        required: true,
        maxLength: 32
    },
    sold: {
        type: Number,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    isPublished: Boolean,
    type: {
        type: String,
        default: 'product'
    }
}, {timestamps: true, id: false})

//objectID necessary for algolia search
productSchema.virtual('objectID').get(function(){
    return this._id.toHexString();
})

productSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Product', productSchema)
