const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/index-errors');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', auth, () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
