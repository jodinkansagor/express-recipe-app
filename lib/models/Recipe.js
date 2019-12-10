const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  measurements: {
    type: String,
    enum: ['teaspoon', 'tablespoon', 'cup', 'ounce', 'grams'],
    required: true
  }
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [ingredientsSchema],
  directions: [String]
});

module.exports = mongoose.model('Recipe', schema);
