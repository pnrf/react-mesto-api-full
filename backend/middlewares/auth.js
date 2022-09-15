const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/index-errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthError('Требуется авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'}`);
  } catch (err) {
    throw new AuthError('Требуется авторизация');
  }

  req.user = payload;

  next();
};
