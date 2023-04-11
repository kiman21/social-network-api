const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction")

const thoughtSchema = new Schema(
  {
    text: 
    { type: String, 
    required: true ,
    minLength: 1,
    maxLength: 280
    },
    createAt: { type: Date, default: Date.now() },
    username: { type: String, required: true },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtSchema.virtual("thoughtsLength").get(function () {
  return this.text.length;
});

// Initialize the Comment model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;