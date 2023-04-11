const { User, Thought } = require("../models");

module.exports = {
  //*get all users
  getUsers(req, res) {
    User.find()
    .populate('thoughts')
    // .populate('friends')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //* Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user is found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //* Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user is found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //*update a user info
  updateSingleUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body  },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //*delete a user
  deleteSingleUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
//*add a friend
  addFriend(req,res){
    User.findOneAndUpdate(      
      { _id: req.params.userId },
      { $push: {friends:req.params.friendId  }},
      { runValidators: true, new: true })
      .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with this id!" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req,res){
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull:{friends:req.params.friendId  }},
      { runValidators: true, new: true })
      .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with this id!" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },

};