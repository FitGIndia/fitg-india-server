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

  image: {
    data: Buffer,
    contentType: String,
  },

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
    type: String,
    maxlenght: 250,
  },

  ratings: {
    type: Number,
    Required: true,
    default: 0,
  },

  plans: {
    type: ObjectId,
    ref: 'Product',
  },

  location: {
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
