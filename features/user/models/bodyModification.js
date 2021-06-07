const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const bodyModificationSchema = new mongoose.Schema({
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
        default: 'body-modification'
    }
})

bodyModificationSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

bodyModificationSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('BodyModification', bodyModificationSchema)
