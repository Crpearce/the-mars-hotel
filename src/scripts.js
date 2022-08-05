import "./css/styles.css";
import { fetchData } from "./apiCalls";
import Customer from "./classes/Customer";
import "./images/dead.png";

// query selectors //

// global variables //
let bookingData;
let roomData;
let customerData;

// functions //
function getData() {
  Promise.all([
    fetchData("customers"),
    fetchData("rooms"),
    fetchData("bookings"),
  ]).then(([customersData, roomsData, bookingsData]) => {
    bookingData = bookingsData;
    roomData = roomsData;
    customerData = customersData;
    console.log(bookingData, roomData, customerData);
  });
};

  window.onload = (event) => {
  getData();
  };

  function show(e) {
    e.classList.remove("hidden");
  };

  function hide(e) {
    e.classList.add("hidden");
  };
