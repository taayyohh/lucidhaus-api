const ServiceAnimal = require('../models/serviceAnimal')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.serviceAnimalById = (req, res, next, id) => {
    const serviceAnimalId = id.substr(id.lastIndexOf('-') + 1)

    ServiceAnimal.findById(id)
        .exec((err, serviceAnimal) => {
            if (err || !serviceAnimal) {
                return res.status(400).json({
                    status: 410,
                    error: 'serviceAnimal not found'
                })
            }
            req.serviceAnimal = serviceAnimal
            next()
        })
}

exports.serviceAnimalBySlug = (req, res, next, slug) => {
    ServiceAnimal.findOne({slug: slug})
        .exec((err, serviceAnimal) => {
            if (err || !serviceAnimal) {
                return res.status(400).json({
                    error: 'serviceAnimal not found'
                })
            }
            req.serviceAnimal = serviceAnimal
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let serviceAnimal = new ServiceAnimal(fields)

            serviceAnimal.save((err, result) => {
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
    return res.json(req.serviceAnimal)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.serviceAnimal._id
            let serviceAnimal = req.serviceAnimal
            serviceAnimal = _.extend(serviceAnimal, fields)


            serviceAnimal.save((err, result) => {
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
    let serviceAnimal = req.serviceAnimal
    serviceAnimal.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'ServiceAnimal deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    ServiceAnimal.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, serviceAnimal) => {
            if (err) {
                return res.status(400).json({
                    message: 'serviceAnimal not found'
                })
            }

            res.send(serviceAnimal)
        })
}

