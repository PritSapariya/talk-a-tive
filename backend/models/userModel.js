const mongoose = require('mongoose');

const userModel = mongoose.Schema(
  {
    user: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.Model('User', userModel);
