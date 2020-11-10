const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

//make the user
router.route('/').get(getUsers).post(createUser);

//remove the user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//remove friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
