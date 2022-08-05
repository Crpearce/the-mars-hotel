import chai from "chai";
const expect = chai.expect;
import Room from "../src/classes/Room";
import { roomSampleData } from "./data.js";

describe("Room", () => {
  let room1;
  let room2;
  let room3;
  let roomsData;

  beforeEach(() => {
    roomsData = roomSampleData;
    room1 = new Room(roomsData[0]);
    room2 = new Room(roomsData[1]);
    room3 = new Room(roomsData[2]);
  });

  it("should be a function", () => {
    expect(Room).to.be.a("function");
  });

  it("should be an instance of Room", () => {
    expect(room1).to.be.an.instanceof(Room);
    expect(room2).to.be.an.instanceof(Room);
    expect(room3).to.be.an.instanceof(Room);
  });

  it('should have a room number', () => {
    expect(room1.number).to.equal(12);
    expect(room2.number).to.equal(18);
    expect(room3.number).to.equal(19);
  });

  it('should have a room type', () => {
    expect(room1.roomType).to.equal('single room');
    expect(room2.roomType).to.equal('junior suite');
    expect(room3.roomType).to.equal('single room');
  });

  it('should know it there is a bidet or not', () => {
    expect(room1.bidet).to.equal(false);
    expect(room2.bidet).to.equal(false);
    expect(room3.bidet).to.equal(true);
  });

  it('should know the room bed size', () => {
    expect(room1.bedSize).to.equal('twin');
    expect(room2.bedSize).to.equal('king');
    expect(room3.bedSize).to.equal('queen');
  });

  it('should know the number of beds in the room', () => {
    expect(room1.numBeds).to.equal(2);
    expect(room2.numBeds).to.equal(2);
    expect(room3.numBeds).to.equal(1);
  });

  it('should have a cost of the room per night', () => {
    expect(room1.costPerNight).to.equal(172.09);
    expect(room2.costPerNight).to.equal(496.41);
    expect(room3.costPerNight).to.equal(374.67);
  });
});
