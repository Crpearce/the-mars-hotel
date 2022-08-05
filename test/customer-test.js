import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import { customerSampleData, roomSampleData, bookingSampleData } from "./data.js";

describe("Customer", () => {
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
    bookings = bookingSampleData;
    rooms = roomSampleData;
  });

  it("should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("should be an instance of Customer", () => {
    expect(customer1).to.be.an.instanceof(Customer);
    expect(customer2).to.be.an.instanceof(Customer);
    expect(customer3).to.be.an.instanceof(Customer);
  });

  it("should have a customer id", () => {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(2);
    expect(customer3.id).to.equal(3);
  });

  it("should have a customer name", () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal("Rocio Schuster");
    expect(customer3.name).to.equal("Kelvin Schiller");
  });

  it("should be able to return a customers past and future bookings", () => {
    customer1.findCustomerBookings(bookings);
    customer2.findCustomerBookings(bookings);
    expect(customer1.bookedRooms).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 12,
      }
    ]);
    expect(customer2.bookedRooms).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6uf",
        userID: 2,
        date: "2023/01/09",
        roomNumber: 18,
      },
      {
        id: "5fwrgu4i7k55hl6uy",
        userID: 2,
        date: "2023/01/24",
        roomNumber: 19,
      }
    ]);
  });

  it("should be able to check how much a customer has spent on room bookings", () => {
    customer1.findCustomerBookings(bookings);
    customer2.findCustomerBookings(bookings);
    customer3.findCustomerBookings(bookings);
    customer1.findCustomerTotalSpent(rooms);
    customer2.findCustomerTotalSpent(rooms);
    customer3.findCustomerTotalSpent(rooms);
    expect(customer1.totalRoomCost).to.equal(172.09);
    expect(customer2.totalRoomCost).to.equal(871.08);
    expect(customer3.totalRoomCost).to.equal(0);
  });

  it("should be able to tell which rooms a customer has booked", () => {
    customer1.findCustomerBookings(bookings);
    customer2.findCustomerBookings(bookings);
    customer1.findCustomerRooms(rooms);
    customer2.findCustomerRooms(rooms);
    expect(customer1.allBookedRooms).to.deep.equal([
      {
        number: 12,
        roomType: "single room",
        bidet: "single room",
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 172.09,
      }
    ]);
    expect(customer2.allBookedRooms).to.deep.equal([
      {
        number: 18,
        roomType: "junior suite",
        bidet: "junior suite",
        bedSize: "king",
        numBeds: 2,
        costPerNight: 496.41,
      },
      {
        number: 19,
        roomType: "single room",
        bidet: "single room",
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 374.67,
      }
    ]);
  });


});
