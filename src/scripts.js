import { fetchData } from './apiCalls';
import Booking from './classes/booking';
import './css/styles.css';
import './images/dead.png';

// global variables
let bookingData, roomData, customerData;


Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
.then(([customersData, roomsData, bookingsData]) => {
  bookingData = bookingsData
  roomData = roomsData
  customerData = customersData
  console.log(bookingData)
  console.log(roomData);
  console.log(customerData)
  });


function showData(bookingData) {
  console.log(bookingData)
}
showData();
