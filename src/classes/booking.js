class Booking {
    constructor(bookingData) {
        this.bookingId = bookingData.bookingId;
        this.userId = bookingData.userId;
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
    };
};

export default Booking;