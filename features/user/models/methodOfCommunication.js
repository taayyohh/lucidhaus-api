const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const methodOfCommunicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 32
    },
    description: {
        type: String
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    type: {
        type: String,
        default: 'method-of-communication'
    }
})

methodOfCommunicationSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

methodOfCommunicationSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('MethodOfCommunication', methodOfCommunicationSchema)
