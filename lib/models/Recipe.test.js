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
      ],
      type: 'Dessert',
      imageURL: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjDxbWcwLbmAhUHIDQIHVBpA-kQjRx6BAgBEAQ&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCookie&psig=AOvVaw1o98gIzl3PFwqUf4YFgYvQ&ust=1576459713920124'
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
      ],
      type: 'Dessert',
      imageURL: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjDxbWcwLbmAhUHIDQIHVBpA-kQjRx6BAgBEAQ&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCookie&psig=AOvVaw1o98gIzl3PFwqUf4YFgYvQ&ust=1576459713920124'
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
      ],
      type: 'Dessert',
      imageURL: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjDxbWcwLbmAhUHIDQIHVBpA-kQjRx6BAgBEAQ&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCookie&psig=AOvVaw1o98gIzl3PFwqUf4YFgYvQ&ust=1576459713920124'
    });
  });

});
