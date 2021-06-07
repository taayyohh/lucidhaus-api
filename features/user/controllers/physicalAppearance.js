const PhysicalAppearance = require('../models/physicalAppearance')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.physicalAppearanceById = (req, res, next, id) => {
    const physicalAppearanceId = id.substr(id.lastIndexOf('-') + 1)

    PhysicalAppearance.findById(id)
        .exec((err, physicalAppearance) => {
            if (err || !physicalAppearance) {
                return res.status(400).json({
                    status: 410,
                    error: 'physicalAppearance not found'
                })
            }
            req.physicalAppearance = physicalAppearance
            next()
        })
}

exports.physicalAppearanceBySlug = (req, res, next, slug) => {
    PhysicalAppearance.findOne({slug: slug})
        .exec((err, physicalAppearance) => {
            if (err || !physicalAppearance) {
                return res.status(400).json({
                    error: 'physicalAppearance not found'
                })
            }
            req.physicalAppearance = physicalAppearance
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let physicalAppearance = new PhysicalAppearance(fields)

            physicalAppearance.save((err, result) => {
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
    return res.json(req.physicalAppearance)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.physicalAppearance._id
            let physicalAppearance = req.physicalAppearance
            physicalAppearance = _.extend(physicalAppearance, fields)


            physicalAppearance.save((err, result) => {
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
    let physicalAppearance = req.physicalAppearance
    physicalAppearance.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'PhysicalAppearance deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    PhysicalAppearance.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, physicalAppearance) => {
            if (err) {
                return res.status(400).json({
                    message: 'physicalAppearance not found'
                })
            }

            res.send(physicalAppearance)
        })
}

