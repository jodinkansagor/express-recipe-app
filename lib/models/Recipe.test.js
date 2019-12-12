const mongoose = require('mongoose');
const Recipe = require('./Recipe');
const Attempt = require('./Attempt')

describe('Recipe model', () => {
  it('has a required name', () => {
    const recipe = new Recipe();
    const { errors } = recipe.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a name and directions field', () => {
    const recipe = new Recipe({
      name: 'Cookies',
      ingredients: [{ name: 'sugar', amount: 1, measurements: 'cup' }, { name: 'flour', amount: 3, measurements: 'cup' }],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });

    expect(recipe.toJSON()).toEqual({
      _id: recipe._id,
      name: 'Cookies',
      ingredients: [{
        _id: expect.any(Object),
        name: 'sugar', amount: 1, measurements: 'cup'
      }, {
        _id: expect.any(Object),
        name: 'flour', amount: 3, measurements: 'cup'
      }],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
  });

  it('console logs the attempts', async () => {
    const recipe = await new Recipe({
      name: 'Cookies',
      ingredients: [{ name: 'sugar', amount: 1, measurements: 'cup' }, { name: 'flour', amount: 3, measurements: 'cup' }],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
  });

});
