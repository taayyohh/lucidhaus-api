const BusinessOwner = require('../models/businessOwner')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.businessOwnerById = (req, res, next, id) => {
    const businessOwnerId = id.substr(id.lastIndexOf('-') + 1)
    BusinessOwner.findById(id)
        .exec((err, businessOwner) => {
            if (err || !businessOwner) {
                return res.status(400).json({
                    status: 410,
                    error: 'businessOwner not found'
                })
            }
            req.businessOwner = businessOwner
            next()
        })
}

exports.businessOwnerBySlug = (req, res, next, slug) => {
    BusinessOwner.findOne({slug: slug})
        .exec((err, businessOwner) => {
            if (err || !businessOwner) {
                return res.status(400).json({
                    error: 'businessOwner not found'
                })
            }
            req.businessOwner = businessOwner
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let businessOwner = new BusinessOwner(fields)

            businessOwner.save((err, result) => {
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
    return res.json(req.businessOwner)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.businessOwner._id
            let businessOwner = req.businessOwner
            businessOwner = _.extend(businessOwner, fields)


            businessOwner.save((err, result) => {
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
    let businessOwner = req.businessOwner
    businessOwner.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'BusinessOwner deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    BusinessOwner.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, businessOwner) => {
            if (err) {
                return res.status(400).json({
                    message: 'businessOwner not found'
                })
            }

            res.send(businessOwner)
        })
}

