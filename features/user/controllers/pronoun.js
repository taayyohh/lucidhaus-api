const Pronoun = require('../models/pronoun')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.pronounById = (req, res, next, id) => {
    const pronounId = id.substr(id.lastIndexOf('-') + 1)

    Pronoun.findById(id)
        .exec((err, pronoun) => {
            if (err || !pronoun) {
                return res.status(400).json({
                    status: 410,
                    error: 'pronoun not found'
                })
            }
            req.pronoun = pronoun
            next()
        })
}

exports.pronounBySlug = (req, res, next, slug) => {
    Pronoun.findOne({slug: slug})
        .exec((err, pronoun) => {
            if (err || !pronoun) {
                return res.status(400).json({
                    error: 'pronoun not found'
                })
            }
            req.pronoun = pronoun
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let pronoun = new Pronoun(fields)

            pronoun.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                res.json(result)
            })
        })
}

exports.read = (req, res) => {
    return res.json(req.pronoun)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.pronoun._id
            let pronoun = req.pronoun
            pronoun = _.extend(pronoun, fields)


            pronoun.save((err, result) => {
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
    let pronoun = req.pronoun
    pronoun.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Pronoun deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Pronoun.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, pronoun) => {
            if (err) {
                return res.status(400).json({
                    message: 'pronoun not found'
                })
            }

            res.send(pronoun)
        })
}

