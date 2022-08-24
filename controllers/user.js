const User = require('../models/user')
const GymRequest = require('../models/gymrequest')
const { dispatchMail } = require('./dispatchMail')

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
  gymRequest.save(async (err, gymRequest) => {
    if (err) {
      return res.status(400).json({
        error: 'NOT able to save request in DB' + err,
      })
    }

    const mailBody = `<html>
    <body style="color: #3f48cc">
      <h2 style="text-transform: capitalize">Hello ${gymRequest.name}, </h2> <br/>
      <p><b>Welcome to FitG India, We received your request to be a partner, our team will connect you shortly and provide you Platform Demo.<b></p> 
      <p><b> Thank you for a being part of FitG India Community!<b> </p> <br/>

     <p>Thanks & Regards</p>
     <p>Team FitG India </p>
     <p><a href="https://www.fitgindia.com" target="_blank"> www.fitgindia.com</a></p>
    </body>
    </html>
    `

    const data = {
      receiver: gymRequest.email,
      subject: 'Welcome to FitG India',
      html: mailBody,
    }
    dispatchMail(data)

    // console.log('its result', result)
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      data: {
        email: gymRequest.email,
        name: gymRequest.name,
      },
    })
  })
}
