require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Recipe = require('../lib/models/Recipe');
const Attempt = require('../lib/models/Attempt');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  let cookieTries;
  let cookies;
  beforeEach(async () => {
    cookies = await Recipe
      .create({
        name: 'cookies',
        ingredients: [{ name: 'sugar', amount: 1, measurements: 'cup' }, { name: 'flour', amount: 3, measurements: 'cup' }],
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ]
      });

    cookieTries = await Attempt.create([
      {
        recipeId: cookies._id,
        dateOfEvent: new Date(),
        notes: 'perfect',
        rating: 20
      },
      {
        recipeId: cookies._id,
        dateOfEvent: new Date(),
        notes: 'more salt',
        rating: 15
      },
      {
        recipeId: cookies._id,
        dateOfEvent: 'December 25, 2019',
        notes: new Date(),
        rating: 17
      }
    ]);
  });

  it('creates a recipe', () => {
    return request(app)
      .post('/api/v1/recipes')
      .send({
        name: 'cookies',
        ingredients: [{ name: 'sugar', amount: 1, measurements: 'cup' }, { name: 'flour', amount: 3, measurements: 'cup' }],
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'cookies',
          ingredients: [{
            _id: expect.any(String),
            name: 'sugar', amount: 1, measurements: 'cup'
          }, {
            _id: expect.any(String),
            name: 'flour', amount: 3, measurements: 'cup'
          }], directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        });
      });
  });

  it('gets all recipes', async () => {
    const recipes = await Recipe.create([
      { name: 'cookies', directions: [] },
      { name: 'cake', directions: [] },
      { name: 'pie', directions: [] }
    ]);

    return request(app)
      .get('/api/v1/recipes')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual({
            _id: recipe._id.toString(),
            name: recipe.name
          });
        });
      });
  });

  it('gets all recipes based on if it has an ingredient', () => {
    return request(app)
      .get('/api/v1/recipes?ingredients=flour')
      .then(res => {
        expect(res.body).toEqual([{
          '__v': 0,
          '_id': JSON.parse(JSON.stringify(cookies._id)),
          'directions': ['preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'],
          'ingredients': [{
            _id: expect.any(String),
            name: 'sugar', amount: 1, measurements: 'cup'
          }, {
            _id: expect.any(String),
            name: 'flour', amount: 3, measurements: 'cup'
          }],
          'name': 'cookies'
        }]);
      });
  });

  it('gets a recipe by id', () => {

    return request(app)
      .get(`/api/v1/recipes/${cookies._id}`)
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining({
          _id: cookies._id.toString(),
          name: 'cookies',
          ingredients: [{
            _id: expect.any(String),
            name: 'sugar', amount: 1, measurements: 'cup'
          }, {
            _id: expect.any(String),
            name: 'flour', amount: 3, measurements: 'cup'
          }], directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        }));
      });

  });

  it.skip('updates a recipe by id', async () => {
    const recipe = await Recipe.create({
      name: 'cookies',
      ingredients: [{ name: 'sugar', amount: 1, measurements: 'cup' }, { name: 'flour', amount: 3, measurements: 'cup' }], directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
    });

    return request(app)
      .patch(`/api/v1/recipes/${recipe._id}`)
      .send({ name: 'good cookies' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'good cookies',
          ingredients: [{
            _id: expect.any(String),
            name: 'sugar', amount: 1, measurements: 'cup'
          }, {
            _id: expect.any(String),
            name: 'flour', amount: 3, measurements: 'cup'
          }], directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          __v: 0
        });
      });
  });

  it('deletes a recipe from an id', () => {


    return request(app)
      .delete(`/api/v1/recipes/${cookies._id}`)
      .then(res => {
        expect(res.body).toEqual([{
          __v: 0,
          _id: expect.any(String),
          directions: ['preheat oven to 375', 'mix ingredients', 'put dough on cookie sheet', 'bake for 10 minutes'],
          ingredients: [{ _id: expect.any(String), amount: 1, measurements: 'cup', name: 'sugar' }, { _id: expect.any(String), amount: 3, measurements: 'cup', name: 'flour' }],
          name: 'cookies'
        }, { deletedCount: 3, n: 3, ok: 1 }
        ]);
      });
  });
});
