const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const isUrl = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');
const { AuthError } = require('../errors/index-errors');
const { urlRegex } = require('../utils/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} -- невалидная ссылка на картинку аватарки`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Некорректый адрес почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неверно указаны почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неверно указаны почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
