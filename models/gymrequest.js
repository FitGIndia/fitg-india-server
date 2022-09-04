const mongoose = require('mongoose')

const gymRequestSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
      maxlenght: 32,
    },

    email: {
      required: true,
      type: String,
      trim: true,
      unique: true,
    },

    contact: {
      required: true,
      type: String,
      trim: true,
    },

    message: {
      type: String,
      maxlenght: 100,
    },

    status: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('GymRequest', gymRequestSchema)
