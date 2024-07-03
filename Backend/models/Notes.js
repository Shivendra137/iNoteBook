const mongoose = require("mongoose");
const {Schema} = require('mongoose')
const NotesSchema = new Schema({

  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  title: {
    type: String,
    required: true,
   
  },

  description: {
    type: String,
    required: true,
    
  },

  tag: {
    type: String,
    default : "General"
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model("note", NotesSchema);

module.exports = Notes;
