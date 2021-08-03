const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [20, 'Cannot be more than 15 characters'],
  },
  desc: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [100, 'Description is too long'],
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
})

module.exports = mongoose.models.Todo || mongoose.model('Todo', TodoSchema)
