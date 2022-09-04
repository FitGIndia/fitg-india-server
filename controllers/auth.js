const User = require('../models/user')
const { check, validationResult } = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
require('dotenv').config()

exports.signup = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    })
  }

  const user = new User(req.body)
  // console.log("user before save in db", user);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        errorMessage: `NOT able to save user in DB`,
        error: err,
      })
    }
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id,
    })
  })
}

exports.signin = (req, res) => {
  const errors = validationResult(req)
  const { username, password } = req.body

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    })
  }

  User.findOne({ username }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'user does not exists',
      })
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: 'username and password do not match',
      })
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET)
    //put token in cookie
    res.cookie('token', token, { expire: new Date() + 9999 })

    //send response to front end
    const {
      _id,
      firstName,
      lastName,
      email,
      username,
      role,
      cart,
      plans,
      orders,
      contact,
    } = user
    return res.json({
      token,
      user: {
        _id,
        firstName,
        email,
        lastName,
        username,
        role,
        cart,
        plans,
        orders,
        contact,
      },
    })
  })
}

exports.signout = (req, res) => {
  res.clearCookie('token')
  res.json({
    message: 'User signout successfully',
  })
}

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
})

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED',
    })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'You are not ADMIN, Access denied',
    })
  }
  next()
}
