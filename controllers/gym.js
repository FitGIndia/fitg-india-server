const Gym = require('../models/gym')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const { Formidable } = require('formidable')

exports.getGymById = (req, res, next, id) => {
  Gym.findById(id).exec((err, gym) => {
    if (err || !gym) {
      return res.status(400).json({
        err: 'Gym not found in DB',
      })
    }
    req.gym = Gym
    next()
  })
}

exports.addGym = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: 'Problem with Image',
      })
    }
    //TODO: restrictions on fields
    let gym = new Gym(fields)

    gym.location.street = fields.street
    gym.location.landmark = fields.landmark
    gym.location.state = fields.state
    gym.location.pin = fields.pin
    gym.owner = req.profile._id

    if (file.image) {
      if (file.image.size > 2000000) {
        return res.status(400).json({
          error: 'file size too big',
        })
      }
      gym.image.data = fs.readFileSync(file.image.path)
      gym.image.contentType = file.image.type
    }

    //Save to the DB
    console.log(gym)

    gym.save((err, gym) => {
      if (err) {
        console.log(err)
        return res.status(400).json({
          err: 'Failed to register gym',
        })
      }
      res.json({
        msg: `Gym registered successfully`,
        gymid: gym._id,
        name: gym.name,
      })
    })
  })
}
