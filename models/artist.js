const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema


const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: 'String'
    }

})


module.exports = mongoose.model('Artist', artistSchema)