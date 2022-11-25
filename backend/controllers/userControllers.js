const CustomErrorHandler = require('../helpers/CustomErrorHandler');
const User = require('../models/userModel');
const { generateToken } = require('../services/jwt-service');

const registerUser = async (req, res, next) => {
  const { name, email, password, pic } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(
        CustomErrorHandler.alreadyExist('Email is already registred!')
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    return next(error);
  }
};

const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (await user.matchPassword(password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        });
      } else {
        return next(CustomErrorHandler.wrongCredentials());
      }
    } else {
      return next(CustomErrorHandler.notFound('User does not exists.'));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { registerUser, authUser };
