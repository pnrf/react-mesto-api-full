const Card = require('../models/card');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors/index-errors');

module.exports.getCards = (req, res, next) => {
  const { allCards } = {};
  return Card
    .find(allCards)
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(`Переданы некорректные данные при создании карточки -- ${err.name}`);
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const cardId = req.params.id;

  return Card
    .findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Card
          .findByIdAndRemove(cardId)
          .then(() => res.send(card))
          .catch(next);
      }
      throw new ForbiddenError('Попытка удалить чужую карточку');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError('Указанный _id не найден');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные для постановки лайка');
      } else if (err.name === 'NotFound') {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      throw new NotFoundError('Указанный _id не найден');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные для снятия лайка');
      } else if (err.name === 'NotFound') {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else {
        next(err);
      }
    });
};
