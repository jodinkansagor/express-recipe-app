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
    Recipe
      .find()
      .select({ name: true })
      .then(recipes => res.send(recipes));
  })

  .get('/api/v1/recipes?query', (req, res) => {
    Recipe
      .find({ ingredients: req.query.ingredients })
      .then(recipes => res.send(recipes));
  })

  .get('/api/v1/recipes/:id', (req, res) => {
    Promise.all([
      Recipe.findById(req.params.id),
      Attempt.find({ recipeId: req.params.id })
    ])
      .then(([recipe, attempts]) => {
        res.send({ ...recipe.toJSON(), attempts });
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
