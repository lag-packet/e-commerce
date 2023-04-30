const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

function signToken(user) {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h' });

  return token;
}

module.exports = {
  signToken,
};
