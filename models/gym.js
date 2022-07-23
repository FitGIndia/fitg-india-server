const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const gymSchema = new mongoose.Schema({
  gym_name: {
    required: true,
    type: String,
    trim: true,
    maxlenght: 32,
  },

  username: {
    required: true,
    type: String,
    trim: true,
    maxlenght: 32,
    unique: true,
  },

  display_image: {
    data: Buffer,
    contentType: String,
  },

  images: [
    {
      url: {
        type: String,
      },
    },
  ],

  gym_mode: {
    type: String,
    required: true,
  },

  owner: {
    type: ObjectId,
    ref: 'User',
    // required: true,
  },

  admins: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],

  about: {
    tags: [],
    bio: {
      type: String,
      maxlenght: 250,
    },
  },

  rating: {
    type: Number,
    Required: true,
    default: 0,
  },

  reviews: {
    type: ObjectId,
    ref: 'Reviews',
  },

  plans: {
    type: ObjectId,
    ref: 'Product',
  },

  youtube: {
    type: String,
    maxlenght: 40,
  },

  timing: {
    morning: {
      type: String,
    },
    evening: {
      type: String,
    },
  },

  address: {
    street: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
    },
  },
})

module.exports = mongoose.model('Gym', gymSchema)
