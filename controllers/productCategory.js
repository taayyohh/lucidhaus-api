const formidable = require('formidable')
const ProductCategory = require('../models/productCategory')
const {errorHandler} = require('../helpers/dbErrorHandler')
const _ = require('lodash')


exports.categoryById = (req, res, next, id) => {
    ProductCategory.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'product category does not exist'
            })
        }
        req.category = category
        next()
    })
}

exports.productCategoryBySlug = (req, res, next, slug) => {
    ProductCategory.findOne({slug: slug})
        .exec((err, category) => {
            if (err || !category) {
                return res.status(400).json({
                    error: 'product category not found'
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
            let productCategory = new ProductCategory(fields)

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
            message: 'ProductCategory successfully deleted'
        })
    })
}

exports.list = (req, res) => {
    ProductCategory.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler((err))
            })
        }

        res.json(data)
    })
}