const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const tasks = new mongoose.Schema({
    name: String,
    description: String
})

const serviceAnimalSchema = new mongoose.Schema({
    name: String,
    description: String,
    tasks: [tasks],
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    type: {
        type: String,
        default: 'service-animal'
    }
})

serviceAnimalSchema.virtual('objectID').get(function () {
    return this._id.toHexString()
})

serviceAnimalSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('ServiceAnimal', serviceAnimalSchema)
