const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug)

const IdentitySchema = new mongoose.Schema({
    adaptiveEquipment: [{
        type: ObjectId,
        ref: 'AdaptiveEquipment'
    }],
    bodyModifications: [{
        type: ObjectId,
        ref: 'BodyModifications'
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
    methodsOfCommunication: [{
        type: ObjectId,
        ref: 'MethodsOfCommunication'
    }],
    physicalAppearance: [{
        type: ObjectId,
        ref: 'PhysicalAppearance'
    }],
    pronouns: [{
        type: ObjectId,
        ref: 'Pronoun'
    }],
    race: [{
        type: ObjectId,
        ref: 'race'
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
