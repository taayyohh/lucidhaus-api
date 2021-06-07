const CommunityServed = require('../models/communitiesServed')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.communitiesServedById = (req, res, next, id) => {
    const communitiesServedId = id.substr(id.lastIndexOf('-') + 1)

    CommunityServed.findById(id)
        .exec((err, communitiesServed) => {
            if (err || !communitiesServed) {
                return res.status(400).json({
                    status: 410,
                    error: 'communitiesServed not found'
                })
            }
            req.communitiesServed = communitiesServed
            next()
        })
}

exports.communitiesServedBySlug = (req, res, next, slug) => {
    CommunityServed.findOne({slug: slug})
        .exec((err, communitiesServed) => {
            if (err || !communitiesServed) {
                return res.status(400).json({
                    error: 'communitiesServed not found'
                })
            }
            req.communitiesServed = communitiesServed
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let communitiesServed = new CommunityServed(fields)

            communitiesServed.save((err, result) => {
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
    return res.json(req.communitiesServed)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.communitiesServed._id
            let communitiesServed = req.communitiesServed
            communitiesServed = _.extend(communitiesServed, fields)


            communitiesServed.save((err, result) => {
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
    let communitiesServed = req.communitiesServed
    communitiesServed.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'CommunityServed deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    CommunityServed.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, communitiesServed) => {
            if (err) {
                return res.status(400).json({
                    message: 'communitiesServed not found'
                })
            }

            res.send(communitiesServed)
        })
}

