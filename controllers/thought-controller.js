const { thought, user } = require('../models');

const thoughtController = {
  // get thoughts
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // create thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought successfully created!' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this ID' });
        }
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({
            message:
              'The thought was created, but no user with the associated ID!',
          });
        }
        res.json({ message: 'The thought was deleted' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this iD' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // remove reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this ID!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
