const mongoose = require('mongoose')

const tasks = new mongoose.Schema({
    name: String,
    description: String
})

const serviceAnimalSchema = new mongoose.Schema({
    tasks: [tasks],
})

serviceAnimalSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

serviceAnimalSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('ServiceAnimal', serviceAnimalSchema)
