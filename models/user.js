var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    username: {
      type: String,
      maxlength: 32,
      required:true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      maxlength: 12,
      required:true,
      trim: true,
    },
    email: {
      type: String,
      maxlength: 50,
      trim: true,
      default: ""
    },
    userInfo: {
      type: String,
      trim: true,
      default: ""
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    orders: {
      type: Array,
      default: []
    },
    plans: {
      type: Array,
      default: []
    },
    cart: {
      type: Array,
      default: []
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);
