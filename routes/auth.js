var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator')
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')

router.post(
  '/signup',
  [
    check('name', 'name should be at least 3 char').isLength({ min: 3 }),
    check('username', 'name should be at least 3 char').isLength({ min: 3 }),
    check('password', 'password should be at least 5 char').isLength({
      min: 5,
    }),
    check('email', 'email should be at least 5 char')
      .isLength({
        min: 5,
      })
      .isEmail(),
  ],
  signup
)

router.post(
  '/signin',
  [
    check('username', 'username is required').isLength({ min: 3 }),
    check('password', 'password field is required').isLength({ min: 1 }),
  ],
  signin
)

router.get('/signout', signout)

module.exports = router
