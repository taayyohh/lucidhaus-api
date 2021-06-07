const Race = require('../models/race')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')


exports.raceById = (req, res, next, id) => {
    const raceId = id.substr(id.lastIndexOf('-') + 1)

    Race.findById(id)
        .exec((err, race) => {
            if (err || !race) {
                return res.status(400).json({
                    status: 410,
                    error: 'race not found'
                })
            }
            req.race = race
            next()
        })
}

exports.raceBySlug = (req, res, next, slug) => {
    Race.findOne({slug: slug})
        .exec((err, race) => {
            if (err || !race) {
                return res.status(400).json({
                    error: 'race not found'
                })
            }
            req.race = race
            next()
        })
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields, files) => {
            let race = new Race(fields)

            race.save((err, result) => {
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
    return res.json(req.race)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let _id = req.race._id
            let race = req.race
            race = _.extend(race, fields)


            race.save((err, result) => {
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
    let race = req.race
    race.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Race deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Race.find()
        .sort([[sortBy]])
        .limit(limit)
        .exec((err, race) => {
            if (err) {
                return res.status(400).json({
                    message: 'race not found'
                })
            }

            res.send(race)
        })
}

