const Post = require('../models/post')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: 'marketplace not found'
                })
            }
            req.post = post
            next()
        })
}

exports.postBySlug = (req, res, next, slug) => {
    Post.findOne({slug: slug})
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: 'marketplace not found'
                })
            }
            req.post = post
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

            let post = new Post(fields)

            if (files.photo) {


                //check for all fields
                const {name, description} = fields

                if (!name || !description) {
                    return res.status(400).json({
                        error: 'All fields required'
                    })
                }

                post.photo.data = fs.readFileSync(files.photo.path)
                post.photo.contentType = files.photo.type

            }

            post.save((err, result) => {
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
    return res.json(req.post)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.post._id
            let post = req.post
            post = _.extend(post, fields)


            post.save((err, result) => {
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
    let post = req.post
    post.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Post deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Post.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    message: 'admin not found'
                })
            }

            res.send(posts)
        })
}



