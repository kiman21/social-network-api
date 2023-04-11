const { Schema, model } = require('mongoose');
// const { Thought } = require("../models");
const {isEmail} = require('validator')

// Schema to create Post model
const userSchema = new Schema(
  {
    name: {type:String, unique:true, required:true, tri:true },
    email: {type:String, unique:true, required:true, validate: [ isEmail, 'invalid email' ]},
    thoughts: { type: Schema.Types.ObjectId, ref: 'thought' },
    friends:[{ type: Schema.Types.ObjectId, ref: 'user' }]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }  
);

userSchema.virtual("friendCount").get(function(){
  return this.friends.length
})

// Initialize our Post model
const User = model('user', userSchema);

module.exports = User;