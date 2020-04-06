const Artist = require('../models/artist')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.artistById = (req, res, next, id) => {
    Artist.findById(id)
        .exec((err, artist) => {
            if (err || !artist) {
                return res.status(400).json({
                    error: 'artist not found'
                })
            }
            req.artist = artist
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

            let artist = new Artist(fields)

            if (files.photo) {

                if (files.photo.size > 2000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 2MB'
                    })
                }

                //check for all fields
                const {name, description} = fields

                if (!name || !description) {
                    return res.status(400).json({
                        error: 'All fields required'
                    })
                }

                artist.photo.data = fs.readFileSync(files.photo.path)
                artist.photo.contentType = files.photo.type

            }

            artist.save((err, result) => {
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
    req.artist.photo = undefined
    return res.json(req.artist)
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

            let artist = req.artist
            artist = _.extend(artist, fields)

            if (files.photo) {

                if (files.photo.size > 2000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 2MB'
                    })
                }

                //check for all fields
                const {name, description} = fields

                if (!name || !description) {
                    return res.status(400).json({
                        error: 'All fields required'
                    })
                }

                artist.photo.data = fs.readFileSync(files.photo.path)
                artist.photo.contentType = files.photo.type

            }

            artist.save((err, result) => {
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
    let artist = req.artist
    artist.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Artist deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Artist.find()
        .select('-photo')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, artists) => {
            if (err) {
                return res.status(400).json({
                    message: 'artist not found'
                })
            }

            res.send(artists)
        })
}



exports.photo = (req, res, next) => {
    if (req.artist.photo.data) {
        res.set('Content-Type', req.artist.photo.contentType)
        return res.send(req.artist.photo.data)
    }

    next()
}


