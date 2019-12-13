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
    // enum: ['teaspoon', 'tablespoon', 'cup', 'ounce', 'grams'],
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

schema.virtual('attempts', {
  ref: 'Attempt',
  localField: '_id',
  foreignField: 'recipeId'
});

module.exports = mongoose.model('Recipe', schema);
