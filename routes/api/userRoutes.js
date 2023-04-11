const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateSingleUser,
  deleteSingleUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.post(updateSingleUser)
.delete(deleteSingleUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').get(addFriend).delete(deleteFriend)


module.exports = router;