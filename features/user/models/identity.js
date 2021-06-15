const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const {ObjectId, Types} = mongoose.Schema

mongoose.plugin(slug)

const IdentitySchema = new mongoose.Schema({
    adaptiveEquipment: [  Types.Mixed  ],
    bodyModification: [  Types.Mixed  ],
    blind: Boolean,
    deaf: Boolean,
    dateOfBirth: String,
    gender: [  Types.Mixed  ],
    guideAnimal: Boolean,
    languagePrimary: [{
        type: ObjectId,
        ref: 'Language'
    }],
    languageSecondary: [{
        type: ObjectId,
        ref: 'Language'
    }],
    methodOfCommunication: [  Types.Mixed  ],
    physicalAppearance: [  Types.Mixed  ],
    pronoun: [{
        type: ObjectId,
        ref: 'Pronoun'
    }],
    race: [  Types.Mixed  ],
    serviceAnimal: [  Types.Mixed  ],
    sexualOrientation: [  Types.Mixed  ],
    transgender: Boolean
})

module.exports = mongoose.model('Identity', IdentitySchema)
