class Customer {
    constructor (customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
        this.allRooms = [];
        this.bookedRooms = [];
        this.totalSpent = 0;
    };

    // create a method so that a user can view any bookings they
    // have made in the past and in the future
    findCustomerBookings (bookingData) {
        bookingData.forEach(booking => {
            if(this.id === booking.userID) {
            this.bookedRooms.push(booking)
            };
    });
};
    //create a method so that a user can see the total amount they
    //have spent on rooms
    // iterate through this.booked rooms
    // check each booking room number
    // reduce and a forEach
    checkCustomerTotalSpent(roomData) {
}
}

export default Customer;