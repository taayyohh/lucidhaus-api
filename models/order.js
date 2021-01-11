const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema

const CartItemSchema = new mongoose.Schema(
    {
        product: {type: ObjectId, ref: 'Product'},
        name: String,
        price: Number,
        count: Number
    },
    {timestamps: true}
)

const CartItem = mongoose.model('CartItem', CartItemSchema)

const OrderSchema = new mongoose.Schema(
    {
        products: [CartItemSchema],
        transaction_id: {},
        amount: {type: Number},
        company: String,
        address: String,
        address2: String,
        city: String,
        zip: String,
        country: String,
        state: String,
        phone: String,
        email: String,
        status: {
            type: String,
            default: 'Pending',
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] // enum means string objects
        },
        updated: Date,
        user: {
            type: ObjectId,
            ref: 'User'
        }
    },
    {timestamps: true, id: false}
)


//objectID necessary for algolia search
OrderSchema.virtual('objectID').get(function(){
    return this._id.toHexString();
})

OrderSchema.set('toJSON', {
    virtuals: true
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = {Order, CartItem}