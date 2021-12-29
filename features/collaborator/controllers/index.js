const Collaborator = require('../models')
const formidable = require('formidable')
const _ = require('lodash')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')

exports.collaboratorById = (req, res, next, id) => {
    Collaborator.findById(id)
        .exec((err, collaborator) => {
            if (err || !collaborator) {
                return res.status(400).json({
                    error: 'marketplace not found'
                })
            }
            req.collaborator = collaborator
            next()
        })
}

exports.collaboratorBySlug = (req, res, next, slug) => {
    Collaborator.findOne({slug: slug})
        .exec((err, collaborator) => {
            if (err || !collaborator) {
                return res.status(400).json({
                    error: 'marketplace not found'
                })
            }
            req.collaborator = collaborator
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }

            let collaborator = new Collaborator(fields)


            collaborator.save((err, result) => {
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
    return res.json(req.collaborator)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.collaborator._id
            let collaborator = req.collaborator
            collaborator = _.extend(collaborator, fields)


            collaborator.save((err, result) => {
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
    let collaborator = req.collaborator
    collaborator.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Collaborator deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Collaborator.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, collaborators) => {
            if (err) {
                return res.status(400).json({
                    message: 'admin not found'
                })
            }

            res.send(collaborators)
        })
}
