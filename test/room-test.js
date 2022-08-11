import chai from "chai";
const expect = chai.expect;

import Room from "../src/classes/Room";

describe('Room', () => {
  let room1
  let room2

  beforeEach(() => {
    room1 = new Room(15, "residential suite", true, "queen", 1, 358.4);
    room2 = new Room(12, "suite", false, "full", 2, 477.38);
  });

  it("should be a function", () => {
    expect(Room).to.be.a("function");
  });

  it('should have a number', () => {
    expect(room1.number).to.equal(15);
  });

  it('should have a room type', () => {
    expect(room1.roomType).to.equal("residential suite")
    expect(room2.roomType).to.equal("suite")
  })

  it('should be able to have a bidet', () => {
    expect(room1.bidet).to.equal(true)
    expect(room2.bidet).to.equal(false)
  })

  it('should have a bed size', () => {
    expect(room1.bedSize).to.equal("queen")
    expect(room2.bedSize).to.equal("full")
  })

  it('should have a number of beds', () => {
    expect(room1.numBeds).to.equal(1)
    expect(room2.numBeds).to.equal(2)
  })

  it('should have a cost per night', () => {
    expect(room1.costPerNight).to.equal(358.4)
    expect(room2.costPerNight).to.equal(477.38)
  })

});
