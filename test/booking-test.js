import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';
import { customers, roomSampleData, bookingSampleData } from './data.js'


describe('Booking', () => {
    let bookings
    let booking1;
    let booking2;
  
    beforeEach(() => {
        bookings = bookingSampleData;
        booking1 = new Booking(bookings[0]);
        booking2 = new Booking(bookings[1]);
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of a Booking', () => {
    expect(booking1).to.be.an.instanceof(Booking);
    expect(booking2).to.be.an.instanceof(Booking);
  });

});