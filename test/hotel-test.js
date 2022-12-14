import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'
import Customer from '../src/classes/Customer'
import Hotel from '../src/classes/Hotel'

describe('Hotel', () => {
  let room1;
  let room2;
  let room3;
  let room4;
  let room5;
  let room6;
  let room7;
  let room8;
  let room9;
  let room10;
  let roomsData;
  let bookingA;
  let bookingB;
  let bookingC;
  let bookingsData;
  let customer1;
  let customer2;
  let customer3;
  let customersData;
  let hotel;

  beforeEach(() => {
    room1 = new Room(1, "residential suite", true, "queen", 1, 358.4)
    room2 = new Room(2, "suite", false, "full", 2, 477.38)
    room3 = new Room(3, "single room", false, "king", 1, 491.14)
    room4 = new Room(4, "single room", false, "queen", 1, 429.44)
    room5 = new Room(5, "single room", true, "queen", 2, 340.17)
    room6 = new Room(6, "junior suite", true, "queen", 1, 397.02)
    room7 = new Room(7, "single room", false, "queen", 2, 231.46)
    room8 = new Room(8, "junior suite", false, "king", 1, 261.26)
    room9 = new Room(9, "single room", true, "queen", 1, 200.39)
    room10 = new Room(10, "suite", false, "twin", 1, 497.64)
    customer1 = new Customer(1)
    customer2 = new Customer(2)
    customer3 = new Customer(3)
    bookingA = new Booking(customer1, "2022/06/10", room5)
    bookingB = new Booking(customer2, "2022/06/10", room2)
    bookingC = new Booking(customer3, "2022/05/12", room1)
    roomsData = [room1, room2, room3, room4, room5, room6, room7, room8, room9, room10]
    customersData = [customer1, customer2, customer3]
    bookingsData = [bookingA, bookingB, bookingC]
    hotel = new Hotel(bookingsData, roomsData, customersData)
  })

  it('Should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('Should have bookings', () => {
    expect(hotel.bookingsData).to.deep.equal([bookingA, bookingB, bookingC])
  });

  it('Should have rooms', () => {
    expect(hotel.roomsData).to.deep.equal([room1, room2, room3, room4, room5, room6, room7, room8, room9, room10])
  });

  it('Should have customers', () => {
    expect(hotel.customersData).to.deep.equal([customer1, customer2, customer3])
  });

  it('Should find existing customer bookings', () => {
    expect(hotel.findExistingBookings(customer1)).to.deep.equal([bookingA])
  })

  it('Should get corresponding room details from bookings', () => {
    expect(hotel.getRoomInfo([bookingA, bookingC])).to.deep.equal([room1, room5])
    expect(hotel.getRoomInfo([bookingC])).to.deep.equal([room1])
  })

  it('should find available rooms by date', () => {
    hotel.availableRoomsByDate("2022/06/10")
    expect(hotel.availableRooms).to.deep.equal([room1, room3, room4, room6, room7, room8, room9, room10])
    hotel.availableRoomsByDate("2022/05/12")
    expect(hotel.availableRooms).to.deep.equal([room2, room3, room4, room5, room6, room7, room8, room9, room10])
  })

  it('Should find customers total bookings cost', () => {
    expect(hotel.findTotalCost(customer2)).to.deep.equal("$477.38")
  })

  it('should filter a list of rooms based on a tag', () => {
    hotel.availableRoomsByDate("2022/06/10")
    expect(hotel.filterByTags(["single room"], hotel.availableRooms)).to.deep.equal([room3, room4, room7, room9])
  })

  it('should filter a list of rooms based on multiple tags', () => {
    hotel.availableRoomsByDate("2022/06/10")
    expect(hotel.filterByTags(["single room", "residential suite"], hotel.availableRooms)).to.deep.equal([room1, room3, room4, room7, room9])
  })

  it('should not filter if there is no tag', () => {
    hotel.availableRoomsByDate("2022/06/10")
    expect(hotel.filterByTags("")).to.deep.equal([room1, room3, room4, room6, room7, room8, room9, room10])
  })
})