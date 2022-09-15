const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError = require('../errors/index-errors');
const { urlRegex } = require('../utils/regex');

const validateUrl = (url) => {
  const result = isUrl(url);
  if (result) {
    return url;
  }
  throw new BadRequestError('Невалидный URL');
};

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserCreating = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegex),
  }),
});

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateUrl),
  }),
});

// для удаления карточки пользоваля, для лайка и для дизлайка
const validateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateUserId,
  validateLogin,
  validateUserCreating,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCardCreation,
  validateCardId,
};
