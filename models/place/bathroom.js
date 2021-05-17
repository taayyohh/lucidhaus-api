const mongoose = require('mongoose')

const bathroomSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    description: String,
})

module.exports = mongoose.model('Bothroom', bathroomSchema)
