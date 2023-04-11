const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteSingleThought,
  updateSingleThought,
  createReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts)
.post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought)
.post(updateSingleThought)
.delete(deleteSingleThought);

router.route('/:thoughtId/reactions')
.post(createReaction) 

router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)


module.exports = router;