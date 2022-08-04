import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import { customerSampleData, roomSampleData, bookingSampleData } from './data.js';


describe('Customer', () => {
    let customer1;
    let customer2;
    let customer3;
    let customersData;
    let bookings;
    let rooms;
  
    beforeEach(() => {
        customersData = customerSampleData;
        customer1 = new Customer(customersData[0]);
        customer2 = new Customer(customersData[1]);
        customer3 = new Customer(customersData[2]);
        bookings = bookingSampleData
    });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(customer1).to.be.an.instanceof(Customer);
    expect(customer2).to.be.an.instanceof(Customer);
    expect(customer3).to.be.an.instanceof(Customer);
  });

  it('should have a customer id', () => {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(2);
    expect(customer3.id).to.equal(3);
  });

  it('should have a customer name', () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal("Rocio Schuster");
    expect(customer3.name).to.equal("Kelvin Schiller");
  });

  it('should be able to return a customers past and future bookings', () => {
    customer1.findCustomerBookings(bookings)
    customer3.findCustomerBookings(bookings)
    expect(customer1.bookedRooms).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 12
      }
  ]);
    expect(customer3.bookedRooms).to.deep.equal([ 
      {
        id: "5fwrgu4i7k55hl6v3",
        userID: 3,
        date: "2022/02/07",
        roomNumber: 23
      }
  ]);
  });

});