const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../constants/appConstants');

const isLoggedIn = (headers) => {
  try {
    const authHeader = headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  isLoggedIn
}