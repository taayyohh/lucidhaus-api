const MethodOfCommunication = require('../models/methodOfCommunication')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.methodOfCommunicationById = (req, res, next, id) => {
    const methodOfCommunicationId = id.substr(id.lastIndexOf('-') + 1)

    MethodOfCommunication.findById(id)
        .exec((err, methodOfCommunication) => {
            if (err || !methodOfCommunication) {
                return res.status(400).json({
                    status: 410,
                    error: 'methodOfCommunication not found'
                })
            }
            req.methodOfCommunication = methodOfCommunication
            next()
        })
}

exports.methodOfCommunicationBySlug = (req, res, next, slug) => {
    MethodOfCommunication.findOne({slug: slug})
        .exec((err, methodOfCommunication) => {
            if (err || !methodOfCommunication) {
                return res.status(400).json({
                    error: 'methodOfCommunication not found'
                })
            }
            req.methodOfCommunication = methodOfCommunication
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let methodOfCommunication = new MethodOfCommunication(fields)

            methodOfCommunication.save((err, result) => {
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
    return res.json(req.methodOfCommunication)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.methodOfCommunication._id
            let methodOfCommunication = req.methodOfCommunication
            methodOfCommunication = _.extend(methodOfCommunication, fields)


            methodOfCommunication.save((err, result) => {
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
    let methodOfCommunication = req.methodOfCommunication
    methodOfCommunication.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'MethodOfCommunication deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    MethodOfCommunication.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, methodOfCommunication) => {
            if (err) {
                return res.status(400).json({
                    message: 'methodOfCommunication not found'
                })
            }

            res.send(methodOfCommunication)
        })
}

