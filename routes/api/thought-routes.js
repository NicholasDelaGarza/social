const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//add reaction
router.route('/:thoughtId/reactions').post(addReaction);

//take off reaction
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
