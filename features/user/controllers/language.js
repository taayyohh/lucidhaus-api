const Language = require('../models/language')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.languageById = (req, res, next, id) => {
    const languageId = id.substr(id.lastIndexOf('-') + 1)

    Language.findById(id)
        .exec((err, language) => {
            if (err || !language) {
                return res.status(400).json({
                    status: 410,
                    error: 'languageSpoken not found'
                })
            }
            req.language = language
            next()
        })
}

exports.languageBySlug = (req, res, next, slug) => {
    Language.findOne({slug: slug})
        .exec((err, language) => {
            if (err || !language) {
                return res.status(400).json({
                    error: 'languageSpoken not found'
                })
            }
            req.language = language
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let language = new Language(fields)

            language.save((err, result) => {
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
    return res.json(req.language)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.language._id
            let language = req.language
            language = _.extend(language, fields)


            language.save((err, result) => {
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
    let language = req.language
    language.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Language deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Language.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, language) => {
            if (err) {
                return res.status(400).json({
                    message: 'languageSpoken not found'
                })
            }

            res.send(language)
        })
}

