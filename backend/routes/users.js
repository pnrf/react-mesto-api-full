const router = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../middlewares/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validateUserId, getUser);
router.patch('/me', validateUpdateProfile, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
