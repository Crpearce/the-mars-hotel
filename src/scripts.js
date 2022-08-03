import { fetchData } from './apiCalls';
import Booking from './classes/booking';
import './css/styles.css';
import './images/dead.png';

// global variables
let bookingData
let roomData 
let customerData;


function getApiData () {
Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
.then(([customersData, roomsData, bookingsData]) => {
  bookingData = bookingsData;
  roomData = roomsData;
  customerData = customersData;
  console.log(bookingData, roomData, customerData)
  });
};

window.onload = (event) => {
  getApiData();
};
