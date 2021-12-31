const ObjectId = require('mongoose').Types.ObjectId
const VerificationToken = require('../models/verificationToken')
const User = require('../models')

const formidable = require('formidable')
const _ = require('lodash')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let verificationToken = new VerificationToken(fields)

            verificationToken.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                User.findById(verificationToken.user).exec((err, user) => {
                    user.verificationToken = fields.verificationToken
                    user.save((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        }
                    })
                })

                const verificationEmail = {
                    to: req.profile.email,
                    from: 'no-reply@lucid.haus',
                    subject: `LucidHaus: Verify your email!`,
                    html: `https://lucid.haus/verify/${fields.verificationToken}`
                }
                sgMail.send(verificationEmail)

                res.json(result)
            })
        })
}

exports.verify = (req, res) => {
    VerificationToken.findOne({verificationToken: req.params.token})
        .exec((err, verificationToken) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            User.findById(verificationToken.user).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                user.emailVerified = true
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        })
                    }

                    verificationToken.remove((err) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        }
                    })

                    user.hashed_password = undefined
                    user.salt = undefined
                    res.json(result)
                })
            })
        })
}

exports.remove = (req, res) => {
    let verificationToken = req.verificationToken
    verificationToken.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'VerificationToken deleted successfully'
        })
    })
}


exports.verificationTokenByHex = (req, res, next, verificationToken) => {
    VerificationToken.findOne({verificationToken: verificationToken})
        .exec((err, token) => {
            if (err || !token) {
                return res.status(400).json({
                    error: 'Token not found'
                })
            }

            req.verificationToken = verificationToken
            next()
        })
}

exports.resend = (req, res) => {
    const verificationEmail = {
        to: req.profile.email,
        from: 'no-reply@lucid.haus',
        subject: `LucidHaus: Verify your email!`,
        html: `https://lucid.haus/verify/${req.profile.verificationToken}`
    }

    sgMail.send(verificationEmail)
    res.json({success: 'success'})
}

