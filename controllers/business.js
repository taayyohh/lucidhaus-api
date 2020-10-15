const Business = require('../models/business')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.businessById = (req, res, next, id) => {
    Business.findById(id)
        .exec((err, business) => {
            if (err || !business) {
                return res.status(400).json({
                    error: 'admin not found'
                })
            }
            req.business = business
            next()
        })
}

exports.businessBySlug = (req, res, next, slug) => {
    Business.findOne({slug: slug})
        .exec((err, business) => {
            if (err || !business) {
                return res.status(400).json({
                    error: 'admin not found'
                })
            }
            req.business = business
            next()
        })
}


exports.create = (req, res) => {
    console.log('req', req)
    console.log('res', res)
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            console.log('req', req)
            console.log('files', fields)
            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }

            let business = new Business(fields)

            if (files.photo) {


                //check for all fields
                const {name, description} = fields

                if (!name || !description) {
                    return res.status(400).json({
                        error: 'All fields required'
                    })
                }

                business.photo.data = fs.readFileSync(files.photo.path)
                business.photo.contentType = files.photo.type

            }

            business.save((err, result) => {
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
    req.business.photo = undefined
    return res.json(req.business)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }

            let business = req.business
            business = _.extend(business, fields)

            if (files.photo) {

                if (files.photo.size > 2000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 2MB'
                    })
                }

                //check for all fields
                const {name, description} = fields

                if (!name || !description) {
                    return res.status(400).json({
                        error: 'All fields required'
                    })
                }

                business.photo.data = fs.readFileSync(files.photo.path)
                business.photo.contentType = files.photo.type

            }

            business.save((err, result) => {
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
    let business = req.business
    business.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Business deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Business.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, businesss) => {
            if (err) {
                return res.status(400).json({
                    message: 'admin not found'
                })
            }

            res.send(businesss)
        })
}



exports.photo = (req, res, next) => {
    if (req.business.photo.data) {
        res.set('Content-Type', req.business.photo.contentType)
        return res.send(req.business.photo.data)
    }

    next()
}


