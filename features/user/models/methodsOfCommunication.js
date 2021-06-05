const mongoose = require('mongoose')

const methodsOfCommunicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 32
    },
    description: {
        type: String
    }
})

methodsOfCommunicationSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

methodsOfCommunicationSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('MethodsOfCommunication', methodsOfCommunicationSchema)
