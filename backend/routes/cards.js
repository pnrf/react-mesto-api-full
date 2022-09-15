const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCardCreation,
  validateCardId,
} = require('../middlewares/validators');

router.get('/', getCards);
router.post('/', validateCardCreation, createCard);
router.delete('/:id', validateCardId, deleteCard);
router.put('/:id/likes', validateCardId, likeCard);
router.delete('/:id/likes', validateCardId, dislikeCard);

module.exports = router;
