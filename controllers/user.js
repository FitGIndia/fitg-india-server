const User = require('../models/user')
const GymRequest = require('../models/gymrequest')

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user was found in DB',
      })
    }
    req.profile = user
    next()
  })
}

exports.getUser = (req, res) => {
  req.profile.salt = undefined
  req.profile.encry_password = undefined
  return res.json(req.profile)
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req?.profile?._id },
    { $set: req?.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        console.log('error while updating', err)
        res.status(400).json({
          error: 'You are not authorized to update this user',
        })
      } else {
        user.salt = undefined
        user.encry_password = undefined
        res.status(200).json(user)
      }
    }
  )
}

exports.createRequest = (req, res) => {
  console.log('request before save in db', req.body)

  const gymRequest = new GymRequest(req.body)
  // console.log("request before save in db",gymRequest, req.body);
  gymRequest.save((err, gymRequest) => {
    if (err) {
      return res.status(400).json({
        error: 'NOT able to save request in DB' + err,
      })
    }
    res.json({
      email: gymRequest.email,
      id: gymRequest._id,
    })
  })
}
