const ObjectId = require('mongoose').Types.ObjectId
const VerificationToken = require('../models/verificationToken')
const formidable = require('formidable')
const _ = require('lodash')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')

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

                res.json(result)
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

