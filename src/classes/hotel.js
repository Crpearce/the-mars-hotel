class Hotel {
  constructor(bookingsData, roomsData, customersData) {
    this.bookingsData = bookingsData;
    this.roomsData = roomsData;
    this.customersData = customersData;
    this.availableRooms;
  };

  findExistingBookings(customer) {
    const customerBookings = this.bookingsData.filter(booking => customer.id === booking.userID);
    this.roomsData.filter((room) => {
      customerBookings.map((booking) => {
        if (room.number === booking.roomNumber) {
          booking.roomType = room.roomType;
          booking.cost = room.costPerNight;
        };
      });
    });
    return customerBookings.sort((a, b) => b.date[3] - a.date[3]);
  };

  availableRoomsByDate(requestedDate, roomType) {
    const bookingDateMatches = this.bookingsData.filter(booking => requestedDate === booking.date  && roomType === room.roomType);
    let bookedRoomMatches = this.getRoomInfo(bookingDateMatches);
    this.availableRooms = this.roomsData.filter((room) => {
      return !bookedRoomMatches.some((bookedRoom) => {
        return room.number === bookedRoom.number;
      });
    });
  };

  getRoomInfo(bookings) {
    return this.roomsData.reduce((acc, room) => {
      bookings.forEach((booking) => {
        if (booking.roomNumber === room.number) {
          acc.push(room);
        };
      });
      return acc;
    }, []);
  };

  findTotalCost(customer) {
    let total = this.findExistingBookings(customer)
      .reduce((acc, booking) => {
        acc += booking.cost;
        return acc;
      },0);
    return `$${total.toFixed(2)}`;
  };
};

export default Hotel;
