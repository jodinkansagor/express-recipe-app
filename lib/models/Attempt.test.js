const mongoose = require('mongoose');
const Attempt = require('./Attempt');

describe('Attempt model', () => {
  it('has a required notes', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();
    expect(errors.notes.message).toEqual('Path `notes` is required.');
  });

  it('has a date field', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();
    expect(errors.dateOfEvent.message).toEqual('Path `dateOfEvent` is required.');
  });

  it('has a notes field', () => {
    const attempt = new Attempt();
    const { errors } = attempt.validateSync();
    expect(errors.notes.message).toEqual('Path `notes` is required.');
  });

  it('has a rating 0 or above', () => {
    const attempt = new Attempt({
      rating: -1
    });
    const { errors } = attempt.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (-1) is less than minimum allowed value (0).');
  });

  it('has a rating 5 or below', () => {
    const attempt = new Attempt({
      rating: 32
    });
    const { errors } = attempt.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (32) is more than maximum allowed value (20).');
  });
  
  it('has a virutal that will give us the day of the event', () => {
    const attempt = new Attempt({
      receipeId: 'NOTSURE',
      dateOfEvent: new Date(),
      notes: 'good stuff',
      rating: 5
    });
    
    expect(attempt.day).toEqual(12);
  });
});
