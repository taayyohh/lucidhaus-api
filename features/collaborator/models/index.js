const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
const {ObjectId} = mongoose.Schema


mongoose.plugin(slug);

const collaboratorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    },
    isPublished: Boolean
}, { id: false })

//objectID necessary for algolia search
collaboratorSchema.virtual('objectID').get(function(){
    return this._id.toHexString();
})

collaboratorSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Collaborator', collaboratorSchema)
