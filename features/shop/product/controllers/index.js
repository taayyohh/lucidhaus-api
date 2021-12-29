const Product = require('../models')
const formidable = require('formidable')
const _ = require('lodash')
const {errorHandler} = require('../../../../utils/helpers/dbErrorHandler')

exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('productCategory')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'product not found'
                })
            }
            req.product = product
            next()
        })
}

exports.productBySlug = (req, res, next, slug) => {
    Product.findOne({slug: slug})
        .populate('productCategory')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'product not found'
                })
            }
            req.product = product
            next()
        })
}

exports.productsByCategory = (req, res, next, productCategory) => {
    Product.find({category: productCategory})
        .exec((err, products) => {
            if (err || !products) {
                return res.status(400).json({
                    error: 'products not found'
                })
            }
            req.products = products
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let product = new Product(fields)

            product.save((err, result) => {
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
    return res.json(req.product)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {

            let product = req.product

            product = _.extend(product, fields)

            product.save((err, result) => {
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
    let product = req.product
    product.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Product deleted successfully'
        })
    })
}


//SELL AND ARRIVAL
//by sell = /products?sortBy=sold&order=desc&limit=4
//by arrival = /products?sortBy=createdAt&order=desc&limit=4
//if no params are sent then all products are returned


exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
        .populate('productCategory')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    message: 'product not found'
                })
            }

            res.send(products)
        })
}


//find products with same cat

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    Product.find({
        _id: {$ne: req.product},
        productCategory: req.product.productCategory
    })
        .sort([[sortBy, order]])
        .limit(limit)
        .populate('productCategory', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    message: 'no related products'
                })
            }

            res.send(products)
        })
}

exports.listCategories = (req, res) => {
    Product.distinct('productCategory', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                message: 'no related products'
            })
        }

        res.json(categories)
    })
}

exports.listProductsByCategory = (req, res) => {
    res.json(req.products)
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show placeCategory in checkbox and price range in radio buttons
 * as the User clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc'
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
    let limit = req.body.limit ? parseInt(req.body.limit) : 100
    let skip = parseInt(req.body.skip)
    let findArgs = {}

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    Product.find(findArgs)
        .populate('productCategory')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                })
            }
            res.json({
                size: data.length,
                data
            })
        })
}

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }

    next()
}

exports.listSearch = (req, res) => {
    //create query object to hold search value and cat value
    const query = {}
    //assign search value to query.namee
    if (req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'}
        //assign placeCategory value to query.productCategory
        if (req.query.productCategory && req.query.productCategory !== 'All') {
            query.productCategory = req.query.productCategory
        }

        //find product based on query obj (search and cat)
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        })
    }
}

exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map((item) => {
        return {
            updateOne: {
                filter: {_id: item._id},
                update: {$inc: {quantity: -item.count}, sold: +item.count}
            }
        }
    })

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            })
        }
        next()
    })
}

