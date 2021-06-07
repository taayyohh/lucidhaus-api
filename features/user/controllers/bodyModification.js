const BodyModification = require('../models/bodyModification')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.bodyModificationById = (req, res, next, id) => {
    const bodyModificationId = id.substr(id.lastIndexOf('-') + 1)

    BodyModification.findById(id)
        .exec((err, bodyModification) => {
            if (err || !bodyModification) {
                return res.status(400).json({
                    status: 410,
                    error: 'bodyModification not found'
                })
            }
            req.bodyModification = bodyModification
            next()
        })
}

exports.bodyModificationBySlug = (req, res, next, slug) => {
    BodyModification.findOne({slug: slug})
        .exec((err, bodyModification) => {
            if (err || !bodyModification) {
                return res.status(400).json({
                    error: 'bodyModification not found'
                })
            }
            req.bodyModification = bodyModification
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let bodyModification = new BodyModification(fields)

            bodyModification.save((err, result) => {
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
    return res.json(req.bodyModification)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.bodyModification._id
            let bodyModification = req.bodyModification
            bodyModification = _.extend(bodyModification, fields)


            bodyModification.save((err, result) => {
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
    let bodyModification = req.bodyModification
    bodyModification.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'BodyModification deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    BodyModification.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, bodyModification) => {
            if (err) {
                return res.status(400).json({
                    message: 'bodyModification not found'
                })
            }

            res.send(bodyModification)
        })
}

