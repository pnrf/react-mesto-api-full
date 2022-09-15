const jwt = require('jsonwebtoken');
const AuthError = require('../errors/index-errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Требуется авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    req.user = payload;
  } catch (err) {
    throw new AuthError('Требуется авторизация');
  }

  return next();
};
