const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
      published: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      text: {
        type: String,
        minLength: 15,
        maxLength: 500,
      },
      reactions: [Reaction],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  postSchema
  .virtual('getReactions')
  .get(function () {
    return this.reactions.length;
  });

const Post = model('post', postSchema);

module.exports = Post;