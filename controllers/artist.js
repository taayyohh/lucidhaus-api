const Artist = require('../models/artist')
const Album = require('../models/album')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.artistById = (req, res, next, id) => {
    Artist.findById(id)
        .exec((err, artist) => {
            if (err || !artist) {
                return res.status(400).json({
                    error: 'marketplace not found'
                })
            }
            req.artist = artist
            next()
        })
}

exports.artistBySlug = (req, res, next, slug) => {
    Artist.findOne({slug: slug})
        .exec((err, artist) => {
            if (err || !artist) {
                return res.status(400).json({
                    error: 'marketplace not found'
                })
            }
            req.artist = artist
            next()
        })
}

exports.getArtistsCatalogue = (req, res, next, slug) => {

    // Album.find({primaryArtist: })
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
    return res.json(req.artist)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.artist._id
            let artist = req.artist
            artist = _.extend(artist, fields)


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
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, artists) => {
            if (err) {
                return res.status(400).json({
                    message: 'admin not found'
                })
            }

            res.send(artists)
        })
}



