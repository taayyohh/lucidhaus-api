const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const slug = require('mongoose-slug-updater');
const {ObjectId} = mongoose.Schema

mongoose.plugin(slug);

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: ''
    },
    bookmarks: [{
        type: ObjectId,
        ref: 'Place'
    }],
    confirmVerificationDate: {
        type: Date,
        default: () => new Date(+new Date() + 12096e5)
    },
    confirmationAttempt: {
        type: Number,
        default: 0
    },
    dateOfBirth: {
        type: Date,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        default: ''
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    hashed_password: {
        type: String,
        required: true,
    },
    nameFirst: {
        type: String,
        trim: true,
        default: ''
    },
    nameMiddle: {
        type: String,
        trim: true,
        default: ''
    },
    nameLast: {
        type: String,
        trim: true,
        default: ''
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    role: {
        type: Number,
        default: 2
    },
    salt: String,
    slug: {
        type: String,
        slug: ["nameFirst", "nameLast"],
        unique: true,
        permanent: true
    },
    tel: {
        type: String,
        unique: true,
        default: ''
    },
    type: {
        type: String,
        default: 'user'
    },
    verificationToken: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    }
}, {timestamps: true})

/// virtual field
userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

//objectID necessary for algolia search
userSchema.virtual('objectID').get(function () {
    return this._id;
})

userSchema.set('toJSON', {
    virtuals: true
})

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')

        } catch (err) {
            return ''
        }
    },

    generatePasswordReset: function () {
        this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
    }
}

//maybe problematic
mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('User', userSchema)
