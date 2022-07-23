const express = require('express')
const router = express.Router()
const { getUserById, updateUser } = require('../controllers/user')
const { getGymById, addGym } = require('../controllers/gym')
const { s3Upload } = require('../controllers/s3Service')
const multer = require('multer')

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')

const storage = multer.memoryStorage()

// const fileFilter = ()

const upload = multer({
  storage,
  limits: { fileSize: 2000000, files: 3 },
})

//params
router.param('userId', getUserById)
router.param('gymId', getGymById)

//Routes
// router.get("/gym/:gymId", isSignedIn, isAuthenticated, getGymById);

router.post(
  '/gym/reg/:userId',
  isSignedIn,
  isAuthenticated,
  upload.array('images'),
  async (req, res, next) => {
    try {
      const result = await s3Upload(req.files)
      console.log('success', result)
      if (result.length != 0) {
        res.locals.urls = result
      } else {
        res.send({ error: 'error occured in upload' })
      }
    } catch (error) {
      console.log('error occured!!', error)
    }
    next()
  },
  addGym
)

module.exports = router
