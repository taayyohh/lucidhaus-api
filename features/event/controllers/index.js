const Event = require('../models')
const formidable = require('formidable')
const _ = require('lodash')
const {errorHandler} = require('../../../utils/helpers/dbErrorHandler')

exports.eventById = (req, res, next, id) => {
    Event.findById(id)
        .exec((err, event) => {
            if (err || !event) {
                return res.status(400).json({
                    error: 'marketplace not found'
                })
            }
            req.event = event
            next()
        })
}

exports.eventBySlug = (req, res, next, slug) => {
    Event.findOne({slug: slug})
        .exec((err, event) => {
            if (err || !event) {
                return res.status(400).json({
                    error: 'marketplace not found'
                })
            }
            req.event = event
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

            let event = new Event(fields)


            event.save((err, result) => {
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
    return res.json(req.event)
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true,
        form.parse(req, (err, fields) => {
            let event = req.event
            const emailExists = event.attendees.filter((rsvp) => rsvp.email === fields.email).length > 0

            if (!fields.hasOwnProperty('rsvp')) {
                event = _.extend(event, fields)
            } else if (fields.remove) {
                event.attendees.id(fields._id).remove()
            } else {
                if (!emailExists) {
                    event.attendees.push(fields)
                } else {
                    return res.status(400).json({
                        error: 'Already on the list!'
                    })
                }
            }


            event.save((err, result) => {
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
    let event = req.event
    event.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Event deleted successfully'
        })
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Event.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, events) => {
            if (err) {
                return res.status(400).json({
                    message: 'admin not found'
                })
            }

            res.send(events)
        })
}
