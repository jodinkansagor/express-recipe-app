const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  dateOfEvent: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model('Attemp', schema);
