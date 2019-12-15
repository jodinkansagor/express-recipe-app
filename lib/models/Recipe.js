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
    required: true
  }
});

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [ingredientsSchema],
  directions: [String],
  type: {
    type: String,
    enum: ['Italian', 'Mexican', 'American', 'Chinese', 'Japanese', 'Korean', 'Thai', 'Vietnamese', 'Indian', 'Middle Eastern', 'Russian', 'Spanish', 'French', 'Jewish', 'Dessert', 'Central American and Carribbean', 'Hawaiian', 'Other']
  },
  imageURL: {
    type: String,
  }
});

schema.virtual('attempts', {
  ref: 'Attempt',
  localField: '_id',
  foreignField: 'recipeId'
});

module.exports = mongoose.model('Recipe', schema);
