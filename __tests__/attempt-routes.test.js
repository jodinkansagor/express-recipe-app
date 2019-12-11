require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
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

  it.skip('creates an attempt', () => {
    return request(app)
      .post('/api/v1/attempts')
      .send({
        recipeId: 'e1234',
        dateOfEvent: 'December 9, 2019',
        notes: 'use more chocolate',
        rating: 5
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: 'e1234',
          dateOfEvent: 'December 9, 2019',
          notes: 'use more chocolate',
          rating: 5,
          __v: 0
        });
      });
  });

  it.skip('gets all attempts', async () => {
    const attempt = await Attempt.create([
      { recipeId: 'e1234', dateOfEvent: 'December 9, 2019', notes: 'more chocolate', rating: 5 },
      { recipeId: 'e1235', dateOfEvent: 'December 10, 2019', notes: 'more salt', rating: 4 },
      { recipeId: 'e1244', dateOfEvent: 'December 11, 2019', notes: 'more pizzaz', rating: 5 }
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

  it.skip('gets a attempt by id', async () => {
    const attempt = await Attempt.create({
      recipeId: 'e1234', dateOfEvent: 'December 9, 2019', notes: 'more chocolate', rating: 5,
    });

    return request(app)
      .get(`/api/v1/attempts/${attempt._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: attempt._id.toString(),
          recipeId: 'e1234', dateOfEvent: 'December 9, 2019', notes: 'more chocolate', rating: 5,
          __v: 0
        });
      });
  });

  it.skip('updates a attempt by id', async () => {
    const attempt = await Attempt.create({
      recipeId: 'e1234', dateOfEvent: 'December 9, 2019', notes: 'more chocolate', rating: 5
    });

    return request(app)
      .patch(`/api/v1/attempts/${attempt._id}`)
      .send({ notes: 'less flour' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: 'e1234', dateOfEvent: 'December 9, 2019', notes: 'less flour', rating: 5,
          __v: 0
        });
      });
  });

  it.skip('deletes an attempt from an id', async () => {
    const attempt = await Attempt.create({
      recipeId: 'e1234', dateOfEvent: 'December 9, 2019', notes: 'more chocolate', rating: 5
    });

    return request(app)
      .delete(`/api/v1/attempts/${attempt._id}`)
      .then(res => {

        expect(res.body).toEqual({
          _id: attempt._id.toString(),
          recipeId: 'e1234', dateOfEvent: 'December 9, 2019', notes: 'more chocolate', rating: 5,
          __v: 0,
        });
      });
  });
});
