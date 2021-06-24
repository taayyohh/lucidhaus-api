const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug);

const verificationTokenSchema = new mongoose.Schema({
    verificationToken: {
        type: String,
        required: true,
        unique: true,
        maxLength: 128
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        default: 'verification-token'
    }
})

verificationTokenSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('VerificationToken', verificationTokenSchema)
