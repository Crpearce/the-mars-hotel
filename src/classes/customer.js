class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookedRooms = [];
    this.allBookedRooms = [];
    this.sortedBookings = [];
    this.totalRoomCost = 0;
  };

  findCustomerBookings(bookingData) {
    bookingData.forEach((booking) => {
      if (this.id === booking.userID) {
        this.bookedRooms.push(booking);
      }
    });
  };

  findCustomerTotalSpent(roomData) {
    this.totalRoomCost = this.bookedRooms.reduce((acc, bookedRoom) => {
      roomData.forEach((room) => {
        if (bookedRoom.roomNumber === room.number) {
          acc += room.costPerNight;
        }
      });
      return acc;
    }, 0);
    return this.totalRoomCost;
  };

  findCustomerRooms(roomData) {
    const findRooms = this.bookedRooms.reduce((acc, bookedRoom) => {
      roomData.forEach((room) => {
        if (bookedRoom.roomNumber === room.number) {
          let object = {
            number: room.number,
            roomType: room.roomType,
            bidet: room.roomType,
            bedSize: room.bedSize,
            numBeds: room.numBeds,
            costPerNight: room.costPerNight,
          };
          acc.push(object);
        }
      });
      return acc;
    }, []);
    this.allBookedRooms = findRooms;
    return findRooms;
  };

  sortCustomerBookings() {
    // let bookedDates = this.

  }
};

export default Customer;
