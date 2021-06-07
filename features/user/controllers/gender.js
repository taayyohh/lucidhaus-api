const Gender = require('../models/gender')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.genderById = (req, res, next, id) => {
    const genderId = id.substr(id.lastIndexOf('-') + 1)

    Gender.findById(id)
        .exec((err, gender) => {
            if (err || !gender) {
                return res.status(400).json({
                    status: 410,
                    error: 'gender not found'
                })
            }
            req.gender = gender
            next()
        })
}

exports.genderBySlug = (req, res, next, slug) => {
    Gender.findOne({slug: slug})
        .exec((err, gender) => {
            if (err || !gender) {
                return res.status(400).json({
                    error: 'gender not found'
                })
            }
            req.gender = gender
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let gender = new Gender(fields)

            gender.save((err, result) => {
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
    return res.json(req.gender)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.gender._id
            let gender = req.gender
            gender = _.extend(gender, fields)


            gender.save((err, result) => {
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
    let gender = req.gender
    gender.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Gender deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Gender.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, gender) => {
            if (err) {
                return res.status(400).json({
                    message: 'gender not found'
                })
            }

            res.send(gender)
        })
}

