const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  dateOfEvent: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    require: true,
    min: 0,
    max: 20
  }
});

schema.virtual('day')
  .get(function() {
    return this.dateOfEvent.getDate();
  });

schema.virtual('month')
  .get(function() {
    return this.dateOfEvent.getMonth();
  });

schema.virtual('year')
  .get(function() {
    return this.dateOfEvent.getFullYear();
  });

module.exports = mongoose.model('Attempt', schema);
