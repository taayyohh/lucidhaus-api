const Album = require('../models/album')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.albumById = (req, res, next, id) => {
    Album.findById(id)
        .exec((err, album) => {
            if (err || !album) {
                return res.status(400).json({
                    error: 'album not found'
                })
            }
            req.album = album
            next()
        })
}

exports.albumBySlug = (req, res, next, slug) => {
    Album.findOne({slug: slug})
        .exec((err, album) => {
            if (err || !album) {
                return res.status(400).json({
                    error: 'album not found'
                })
            }
            req.album = album
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

            let album = new Album(fields)

            if (files.photo) {

                if (files.photo.size > 2000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 2MB'
                    })
                }

                //check for all fields
                const {name} = fields

                if (!name) {
                    return res.status(400).json({
                        error: 'All fields required'
                    })
                }

                album.photo.data = fs.readFileSync(files.photo.path)
                album.photo.contentType = files.photo.type

            }

            album.save((err, result) => {
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
    req.album.photo = undefined
    return res.json(req.album)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }

            let album = req.album
            album = _.extend(album, fields)

            if (files.photo) {

                if (files.photo.size > 2000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 2MB'
                    })
                }

                //check for all fields
                const {name} = fields

                if (!name) {
                    return res.status(400).json({
                        error: 'All fields required'
                    })
                }

                album.photo.data = fs.readFileSync(files.photo.path)
                album.photo.contentType = files.photo.type

            }

            album.save((err, result) => {
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
    let album = req.album
    album.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Album deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Album.find()
        .select('-photo')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, albums) => {
            if (err) {
                return res.status(400).json({
                    message: 'album not found'
                })
            }

            res.send(albums)
        })
}



exports.photo = (req, res, next) => {
    if (req.album.photo.data) {
        res.set('Content-Type', req.album.photo.contentType)
        return res.send(req.album.photo.data)
    }

    next()
}


