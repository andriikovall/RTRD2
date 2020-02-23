const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const config = require('../config');
const handler = require('../errorHandler');

module.exports.register = async function (req, res) {
  try {
    const userCandidate = await User.findOne({
      login: req.body.login,
    });

    console.log('body', req.body);

    if (!req.body.login) {
      handler.response(res, 400, 'login can not be empty');
      return;
    } if (!req.body.password) {
      handler.response(res, 400, 'password can not be empty');
      return;
    } if (userCandidate) {
      handler.response(res, 409, 'this email is already taken');
      return;
    }

    const salt = bcryptjs.genSaltSync(10);
    const { password } = req.body;

    const user = new User(req.body);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.status(201).json(user);
  } catch (e) {
    handler.catch(res, e);
  }
};

module.exports.login = async function (req, res) {
  try {
    const userCandidate = await User.findOne({
      login: req.body.login,
    });

    if (!userCandidate) {
      handler.response(res, 400, 'user with such login doesn`t exist');
      return;
    }

    if (bcryptjs.compareSync(req.body.password, userCandidate.password)) {
      const token = generateToken(userCandidate._id);

      res.status(200).json({
        token: `Bearer ${token}`,
        role: userCandidate.role,
      });
    } else {
      handler.response(res, 400, 'wrong password');
      return;
    }
  } catch (e) {
    handler.catch(res, e);
  }
};

function generateToken(id) {
  return jwt.sign({
    userId: id,
  }, config.jwt, {
    expiresIn: 60 * 60 * 60, //token expires in 60 hours
  })
}
