const mongoose = require('mongoose')

const bathroomSchema = new mongoose.Schema({
    description: String,
    gender: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    multiStall: Boolean,
    toilets: Boolean,
    urinals: Boolean,
})

module.exports = mongoose.model('Bathroom', bathroomSchema)
