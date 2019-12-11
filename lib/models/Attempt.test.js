const mongoose = require('mongoose');
const Attempt = require('./Attempt');

describe('Attempt model', () => {
  it('has a required notes', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();

    expect(errors.notes.message).toEqual('Path `notes` is required.');
  });

  it('has a date, notes, and rating field', () => {
    const attempt = new Attempt({
      recipeId: expect.any(Object),
      dateOfEvent: 'December 9, 2019',
      notes: 'use more chocolate',
      rating: 5
    });

    expect(attempt.toJSON()).toEqual({
      _id: attempt._id,
      recipeId: attempt.recipeId,
      dateOfEvent: 'December 9, 2019',
      notes: 'use more chocolate',
      rating: 5,
    });
  });
});
