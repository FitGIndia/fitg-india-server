const express = require('express')
const router = express.Router()

const { getUserById, getUser } = require('../controllers/user')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getReviewByGymId, postReview } = require('../controllers/review')

router.param('userId', getUserById)

router.get('/reviews/:gymId', getReviewByGymId)
// router.post('/review', isSignedIn, isAuthenticated, postReview)
router.post('/review', postReview)
// router.update('/review', isSignedIn, isAuthenticated, updateReview)

module.exports = router
