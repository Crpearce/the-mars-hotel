import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import { customerSampleData, roomSampleData, bookingSampleData } from './data.js';


describe('Customer', () => {
    let customer1;
    let customer2;
    let customer3;
    let customersData;
  
    beforeEach(() => {
        customersData = customerSampleData;
        customer1 = new Customer(customersData[0]);
        customer2 = new Customer(customersData[1]);
        customer3 = new Customer(customersData[2]);
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

});