const GymReview = require('../models/review')

exports.getReviewByGymId = (req, res, next) => {
  const gymId = req.params.gymId
  console.log('hit get review', gymId)
  GymReview.find({ gym: gymId })
    .populate('user', 'name _id')
    .populate('gym', '_id username')
    .limit(5)
    .exec((err, reviews) => {
      if (err || !reviews) {
        return res.status(400).json({
          statusCode: 999,
          status: 'failed',
          error: 'No review is found in DB',
        })
      } else {
        res.status(200).json({
          statusCode: 200,
          status: 'success',
          data: reviews,
        })
      }
    })
}

exports.postReview = (req, res) => {
  const gymReview = new GymReview(req.body)
  // console.log("user before save in db", user);
  gymReview.save(async (err, review) => {
    if (err) {
      return res.status(400).json({
        errorMessage: `Unable to save gym review in DB`,
        error: err,
      })
    }

    const data = await review.populate('user', 'name _id').execPopulate()
    res.json({
      statusCode: 200,
      status: 'success',
      data,
    })
  })
}

// exports.updateReview = (req, res) => {
//   User.findByIdAndUpdate(
//     { _id: req?.profile?._id },
//     { $set: req?.body },
//     { new: true, useFindAndModify: false },
//     (err, user) => {
//       if (err) {
//         console.log('error while updating', err)
//         res.status(400).json({
//           error: 'You are not authorized to update this user',
//         })
//       } else {
//         user.salt = undefined
//         user.encry_password = undefined
//         res.status(200).json(user)
//       }
//     }
//   )
// }
