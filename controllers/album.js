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
                    error: 'albums not found'
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
                    error: 'albums not found'
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
                    error: 'Album could not be uploaded'
                })
            }

            let album = new Album(fields)

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
    return res.json(req.album)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let album = req.album

            if (!fields.hasOwnProperty('audio')) {
                album = _.extend(album, fields)
            } else if (fields.remove) {
                album.songs.id(fields._id).remove()
            } else {
                if (!!album.songs.id(fields._id)) {
                    album.songs.id(fields._id).set(fields)
                } else {
                    album.songs.push(fields)
                }
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
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, albums) => {
            if (err) {
                return res.status(400).json({
                    message: 'admin not found'
                })
            }

            res.send(albums)
        })
}



