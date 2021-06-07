const FoodOptions = require('../models/foodOptions')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.foodOptionsById = (req, res, next, id) => {
    const foodOptionsId = id.substr(id.lastIndexOf('-') + 1)

    FoodOptions.findById(id)
        .exec((err, foodOptions) => {
            if (err || !foodOptions) {
                return res.status(400).json({
                    status: 410,
                    error: 'foodOptions not found'
                })
            }
            req.foodOptions = foodOptions
            next()
        })
}

exports.foodOptionsBySlug = (req, res, next, slug) => {
    FoodOptions.findOne({slug: slug})
        .exec((err, foodOptions) => {
            if (err || !foodOptions) {
                return res.status(400).json({
                    error: 'foodOptions not found'
                })
            }
            req.foodOptions = foodOptions
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let foodOptions = new FoodOptions(fields)

            foodOptions.save((err, result) => {
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
    return res.json(req.foodOptions)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.foodOptions._id
            let foodOptions = req.foodOptions
            foodOptions = _.extend(foodOptions, fields)


            foodOptions.save((err, result) => {
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
    let foodOptions = req.foodOptions
    foodOptions.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'FoodOptions deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    FoodOptions.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, foodOptions) => {
            if (err) {
                return res.status(400).json({
                    message: 'foodOptions not found'
                })
            }

            res.send(foodOptions)
        })
}

