const { Thought, User} = require("../models");

module.exports = {
  //*get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //* Get a single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought is found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //* Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { name: req.body.username },
          { $set: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the thought🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //*update a Thought info
  updateSingleThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //*delete a Thought
  deleteSingleThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought with that ID" })
          : Thought.deleteMany({ _id: { $in: Thought.thoughts } })
      )
      .then(() =>
        res.json({ message: "Thought and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  //*create a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((application) =>
        !application
          ? res.status(404).json({ message: "No application with this id!" })
          : res.json(application)
      )
      .catch((err) => res.status(500).json(err));
  },
};