const User = require('../models/user')
const {Order} = require('../models/order')
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        req.profile = user
        next()
    })
}

exports.userBySlug = (req, res, next, slug) => {
    User.findOne({slug: slug})
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                })
            }

            req.profile = user
            next()
        })
}

exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

exports.update = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true},
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'You are not authorized to perform this action'
                })
            }

            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)
        }
    )
}

exports.addOrderToUserHistory = (req, res, next) => {
    let history = []

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            slug: item.slug,
            description: item.description,
            photo: item.photo,
            category: item.category,
            quantity: item.quantity,
            transactionId: req.body.order.transactionId,
            amount: req.body.order.amount
        })
    })

    if (!!req.body.order.user) {
        User.findOneAndUpdate({_id: req.body.order.user}, {$push: {history: history}}, {new: true}, (error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'Could not update User purchase history'
                })
            }
            next()
        })
    } else {
        next()
    }

}

exports.purchaseHistory = (req, res) => {
    Order.find({user: req.profile._id})
        .populate('user', '_id name')
        .sort('-createdAt')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(orders)
        })
}

exports.list = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 50

    User.find()
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    message: 'users not found'
                })
            }

            res.send(users)
        })
}

