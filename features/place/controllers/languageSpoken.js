const LanguageSpoken = require('../models/languageSpoken')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')

exports.languageSpokenById = (req, res, next, id) => {
    LanguageSpoken.findById(id)
        .exec((err, languageSpoken) => {
            if (err || !languageSpoken) {
                return res.status(400).json({
                    status: 410,
                    error: 'languageSpoken not found'
                })
            }
            req.languageSpoken = languageSpoken
            next()
        })
}

exports.languageSpokenBySlug = (req, res, next, slug) => {
    LanguageSpoken.findOne({slug: slug})
        .exec((err, languageSpoken) => {
            if (err || !languageSpoken) {
                return res.status(400).json({
                    error: 'languageSpoken not found'
                })
            }
            req.languageSpoken = languageSpoken
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let languageSpoken = new LanguageSpoken(fields)

            languageSpoken.save((err, result) => {
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
    return res.json(req.languageSpoken)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let languageSpoken = req.languageSpoken
            languageSpoken = _.extend(languageSpoken, fields)


            languageSpoken.save((err, result) => {
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
    let languageSpoken = req.languageSpoken
    languageSpoken.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'LanguageSpoken deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    LanguageSpoken.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, languageSpoken) => {
            if (err) {
                return res.status(400).json({
                    message: 'languageSpoken not found'
                })
            }

            res.send(languageSpoken)
        })
}

