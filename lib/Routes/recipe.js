const { Router } = require('express');
const Attempt = require('../models/Attempt');
const Recipe = require('../models/Recipe');

module.exports = Router()
  .post('/api/v1/recipes', (req, res) => {
    Recipe
      .create(req.body)
      .then(recipe => res.send(recipe));
  })

  .get('/api/v1/recipes', (req, res) => {
    if (req.query.ingredients) {
      Recipe
        .find({ 'ingredients.name': req.query.ingredients })
        .then(recipes => res.send(recipes));
    } else {
      Recipe
        .find()
        .select({ name: true, type: true, imageURL: true })
        .then(recipes => res.send(recipes));
    }
  })

  .get('/api/v1/recipes/:id', (req, res) => {
    Recipe
      .findById(req.params.id)
      .populate('attempts')
      .then(recipe => {
        res.send(recipe.toJSON({ virtuals: true }));
      });
  })

  .patch('/api/v1/recipes/:id', (req, res) => {
    Recipe
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(recipe => res.send(recipe));
  })

  .delete('/api/v1/recipes/:id', (req, res) => {
    Promise.all([
      Recipe.findByIdAndDelete(req.params.id),
      Attempt.deleteMany({ recipeId: req.params.id })
    ])
      .then(recipe => res.send(recipe));
  });
