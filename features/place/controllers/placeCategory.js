const PlaceCategory = require('../models/placeCategory')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.placeCategoryById = (req, res, next, id) => {
    PlaceCategory.findById(id)
        .exec((err, placeCategory) => {
            if (err || !placeCategory) {
                return res.status(400).json({
                    status: 410,
                    error: 'placeCategory not found'
                })
            }
            req.placeCategory = placeCategory
            next()
        })
}

exports.placeCategoryBySlug = (req, res, next, slug) => {
    PlaceCategory.findOne({slug: slug})
        .exec((err, placeCategory) => {
            if (err || !placeCategory) {
                return res.status(400).json({
                    error: 'placeCategory not found'
                })
            }
            req.placeCategory = placeCategory
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let placeCategory = new PlaceCategory(fields)

            placeCategory.save((err, result) => {
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
    return res.json(req.placeCategory)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.placeCategory._id
            let placeCategory = req.placeCategory
            placeCategory = _.extend(placeCategory, fields)


            placeCategory.save((err, result) => {
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
    let placeCategory = req.placeCategory
    placeCategory.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'PlaceCategory deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    PlaceCategory.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, placeCategory) => {
            if (err) {
                return res.status(400).json({
                    message: 'placeCategory not found'
                })
            }

            res.send(placeCategory)
        })
}

exports.placeCategoryByNameOrDescription = (req, res, next, searchInput) => {
    PlaceCategory.find({ name: new RegExp(searchInput, 'i')}, '_id').exec((err, placeCategory) => {
        if(err || !placeCategory) {
            return res.status(400).json({
                error: 'no category found'
            })
        }

        req.placeCategory = placeCategory
        next()
    })
}
