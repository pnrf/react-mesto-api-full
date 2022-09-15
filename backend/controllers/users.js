const { JWT_SECRET, NODE_ENV } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../errors/index-errors');

module.exports.getUsers = (req, res, next) => {
  const { allUsers } = {};
  return User
    .find(allUsers)
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  return User
    .findById(id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(`Переданы некорректные данные о пользователе -- ${err.name}`);
      } else if (err.name === 'NotFound') {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User
        .create({
          name, about, avatar, email, password: hash,
        })
        .then((user) => res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError' || err.name === 'CastError') {
            next(new BadRequestError(`Переданы некорректные данные при создании пользователя -- ${err.name}`));
          } else if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(`Переданы некорректные данные о текущем пользователе -- ${err.name}`);
      } else if (err.name === 'NotFound') {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  return User
    .findByIdAndUpdate(
      { _id: req.user._id },
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError(`Переданы некорректные данные при обновлении профиля -- ${err.name}`);
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError(`Переданы некорректные данные при обновлении аватара -- ${err.name}`);
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
