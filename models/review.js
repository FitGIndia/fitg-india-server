const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const reviewSchema = new mongoose.Schema(
  {
    gym: {
      required: true,
      type: ObjectId,
      ref: 'Gym',
    },

    user: {
      required: true,
      type: ObjectId,
      ref: 'User',
    },

    heading: {
      required: true,
      type: String,
      trim: true,
    },

    review: {
      required: true,
      type: String,
      maxlenght: 200,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },

    isEdited: {
      type: String,
    },
  },
  { timestamps: true }
)

reviewSchema.index({ gym: 1, user: 1 }, { unique: true })

module.exports = mongoose.model('GymReview', reviewSchema)
