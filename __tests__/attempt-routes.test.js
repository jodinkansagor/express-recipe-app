require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Attempt = require('../lib/models/Attempt');
const Recipe = require('../lib/models/Recipe');

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

  let cookieRecipe;
  let attempt;
  beforeEach(async () => {
    cookieRecipe = await Recipe
      .create({
        name: 'cookies',
        ingredients: [{ name: 'sugar', amount: 1, measurements: 'cup' }, { name: 'flour', amount: 3, measurements: 'cup' }],
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes']
      });

    attempt = await Attempt
      .create({
        recipeId: cookieRecipe._id,
        dateOfEvent: new Date(),
        notes: 'good cookies',
        rating: 15
      });
  });

  it('creates an attempt', () => {
    return request(app)
      .post('/api/v1/attempts')
      .send({
        recipeId: cookieRecipe._id,
        dateOfEvent: Date.now(),
        notes: 'use more chocolate',
        rating: 5
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: cookieRecipe._id.toString(),
          dateOfEvent: expect.any(String),
          notes: 'use more chocolate',
          rating: 5,
          __v: 0
        });
      });
  });

  it('gets all attempts', async () => {
    const attempt = await Attempt.create([
      { recipeId: cookieRecipe._id.toString(), dateOfEvent: Date.now(), notes: 'more chocolate', rating: 5 },
      { recipeId: cookieRecipe._id.toString(), dateOfEvent: Date.now(), notes: 'more salt', rating: 4 },
      { recipeId: cookieRecipe._id.toString(), dateOfEvent: Date.now(), notes: 'more pizzaz', rating: 5 }
    ]);

    return request(app)
      .get('/api/v1/attempts')
      .then(res => {
        attempt.forEach(attempt => {
          expect(res.body).toContainEqual({
            _id: attempt._id.toString(),
            name: attempt.name
          });
        });
      });
  });

  it('gets a attempt by id', () => {
    return request(app)
      .get(`/api/v1/attempts/${attempt._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: attempt._id.toString(),
          recipeId: JSON.parse(JSON.stringify(cookieRecipe._id)),
          dateOfEvent: expect.any(String),
          notes: 'good cookies',
          rating: 15,
          __v: 0
        });
      });
  });

  it('updates a attempt by id', () => {

    return request(app)
      .patch(`/api/v1/attempts/${attempt._id}`)
      .send({ notes: 'less flour' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: cookieRecipe._id.toString(), dateOfEvent: expect.any(String), notes: 'less flour', rating: 15,
          __v: 0
        });
      });
  });

  it('deletes an attempt from an id', () => {
    return request(app)
      .delete(`/api/v1/attempts/${attempt._id}`)
      .then(res => {

        expect(res.body).toEqual({
          _id: attempt._id.toString(),
          recipeId: cookieRecipe._id.toString(), dateOfEvent: expect.any(String), notes: 'good cookies', rating: 15,
          __v: 0,
        });
      });
  });
});
