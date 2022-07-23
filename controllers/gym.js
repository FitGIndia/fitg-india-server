const Gym = require('../models/gym')
const User = require('../models/user')
const _ = require('lodash')
const fs = require('fs')
const { updateUser } = require('./user')

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
  // console.log('we reached here', req.body, res.locals.url)
  const fields = req.body
  const images = res.locals.urls

  let gym = new Gym(fields)
  gym.address.street = fields.street
  gym.address.landmark = fields.landmark
  gym.address.state = fields.state
  gym.address.pin = fields.pin
  gym.owner = req.profile._id
  gym.images = images

  //Save to the DB
  console.log(gym)

  gym.save((err, gym) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        err: 'Failed to register gym',
      })
    }
    let set = { role: 1 }
    let id = gym.owner

    //Updating user role to admin
    User.findByIdAndUpdate(
      { _id: id },
      { $set: set },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          console.log('error while updating', err)
          return res.status(400).json({
            error: 'You are not authorized to update this user',
          })
        }

        res.status(200).json({
          msg: `Gym registered successfully`,
          gymid: gym._id,
          name: gym.name,
          role: user.role,
        })
      }
    )
  })
  // })
}
