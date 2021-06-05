const formidable = require('formidable')
const Category = require('../models/category')
const {errorHandler} = require('../../../../utils/helpers/dbErrorHandler')
const _ = require('lodash')

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'product categories does not exist'
            })
        }
        req.category = category
        next()
    })
}

exports.productCategoryBySlug = (req, res, next, slug) => {
    Category.findOne({slug: slug})
        .exec((err, category) => {
            if (err || !category) {
                return res.status(400).json({
                    error: 'product categories not found'
                })
            }
            req.category = category
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let productCategory = new Category(fields)

            productCategory.save((err, result) => {
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
    return res.json(req.category)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {

            let category = req.category
           category = _.extend(category, fields)

           category.save((err, result) => {
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
    const category = req.category
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler((err))
            })
        }

        res.json({
            message: 'Category successfully deleted'
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler((err))
            })
        }

        res.json(data)
    })
}
