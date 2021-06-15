const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug)

const IdentitySchema = new mongoose.Schema({
    adaptiveEquipment: [{
        type: ObjectId,
        ref: 'AdaptiveEquipment'
    }],
    bodyModification: [{
        type: ObjectId,
        ref: 'BodyModification'
    }],
    blind: Boolean,
    deaf: Boolean,
    dateOfBirth: String,
    gender: [{
        type: ObjectId,
        ref: 'Gender'
    }],
    guideAnimal: Boolean,
    languagePrimary: [{
        type: ObjectId,
        ref: 'Language'
    }],
    languageSecondary: [{
        type: ObjectId,
        ref: 'Language'
    }],
    methodOfCommunication: [{
        type: ObjectId,
        ref: 'MethodOfCommunication'
    }],
    physicalAppearance: [{
        type: ObjectId,
        ref: 'PhysicalAppearance'
    }],
    pronoun: [{
        type: ObjectId,
        ref: 'Pronoun'
    }],
    race: [{
        type: ObjectId,
        ref: 'Race'
    }],
    serviceAnimal: [{
        type: ObjectId,
        ref: 'ServiceAnimal'
    }],
    sexualOrientation: [{
        type: ObjectId,
        ref: 'SexualOrientation'
    }],
    transgender: Boolean
})

module.exports = mongoose.model('Identity', IdentitySchema)
