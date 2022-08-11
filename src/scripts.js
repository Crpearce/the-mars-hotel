import "./css/styles.css";
import { fetchData } from "./apiCalls";
import "./images/residential-suite.png";
import "./images/suite.png";
import "./images/single-room.png";
import "./images/junior-suite.png";
import "./images/dead.png";
import Customer from "./classes/Customer";
import Room from "./classes/Room";
import Hotel from "./classes/Hotel";
import Booking from "./classes/Booking";

// global variables //
let bookingsData;
let roomsData;
let customersData;
let customer;
let hotel;
let room;
let booking;

// query selectors //
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const searchDate = document.querySelector(".date-input");
const roomStyle = document.querySelector(".room-type-selection");
const loginError = document.querySelector("#loginErrorMessage");
const userBookings = document.querySelector(".user-bookings-container");
const bookingDate = document.querySelector(".date-input");
const bookingRoom = document.querySelector(".room-type-selection");
const mainGreeting = document.querySelector(".main-greeting");
const navigation = document.querySelector(".navigation");
const newBookings = document.querySelector(".booking-header-container");
const totalSpent = document.querySelector(".user-total-spent");
const pastBookings = document.querySelector(".past-bookings-list");
const pastBookingsBtn = document.querySelector(".past-bookings-button");
const homeBtn = document.querySelector(".home-button");
const noVisits = document.querySelector("#errorHandlingNoBookings");
const availableRooms = document.querySelector(".available-rooms-list");
const roomToBook = document.querySelector(".potential-room-booking-container");
const showBookings = document.querySelector(".room-booking");

// event listeners //
window.onload = (event) => {
  getData();
  showLoginView();
};
bookingHeaderContainer.addEventListener("click", handleButtons);
customerLogin.addEventListener("click", handleButtons);
navigationBar.addEventListener("click", handleButtons);
availableRooms.addEventListener("click", handleButtons);
roomToBook.addEventListener("click", handleButtons);

// functions //
function getData() {
  Promise.all([fetchData("rooms"),fetchData("bookings"),fetchData("customers"),])
  .then((value) => {
    roomsData = value[0].rooms;
    bookingsData = value[1].bookings;
    customersData = value[2].customers;
    hotel = new Hotel(bookingsData, roomsData, customersData);
  });
}

function handleButtons(event) {
  switch (event.target.className) {
    case "login-btn":
      verifyLogin(event);
      break;
    case "show-rooms-btn":
      generateAvailableRooms(event);
      break;
    case "clear-entries-btn":
      resetBookingFilters(event);
      break;
    case "past-bookings-button":
      showPastBookings(event);
      break;
    case "home-button":
      showUserView(event);
      break;
    case "book-button":
      showPotentialBooking(event);
      break;
    case "logout-button":
      showLoginView(event);
      break;
    case "confirm-booking-button":
      bookingPost(event);
      break;
    default:
      break;
  }
}

function verifyLogin(event) {
  event.preventDefault();
  if (username.value === "" || password.value === "") {
    loginError.innerText = `PLEASE SUBMIT BOTH USERNAME AND PASSWORD!`;
  } else if (password.value !== "overlook2021") {
    loginError.innerText = `INCORRECT PASSWORD!`;
  } else if (!username.value.includes("customer")) {
    loginError.innerText = `USERNAME DOES NOT EXIST! PLEASE TRY AGAIN.`;
  } else {
    loginError.innerText = '';
    showUserView();
    generateDate();
  }
}

function showLoginView() {
  username.value = '';
  password.value = '';
  availableRooms.innerHTML = '';
  pastBookings.innerHTML = '';
  userBookings.innerHTML = '';
  show(customerLogin);
  hide(availableRooms);
  hide(totalSpent);
  hide(userBookings);
  hide(navigation);
  hide(newBookings);
  hide(mainGreeting);
  hide(roomToBook);
}

function showUserView() {
  userBookings.innerHTML = '';
  availableRooms.innerHTML = '';
  roomToBook.innerHTML = '';
  show(totalSpent);
  show(mainGreeting);
  show(navigation);
  show(userBookings);
  show(newBookings);
  show(pastBookingsBtn);
  show(availableRooms);
  hide(customerLogin);
  hide(pastBookings);
  hide(homeBtn);
  hide(roomToBook);
  generateCustomerBookings();
}

function showPastBookings() {
  show(totalSpent);
  show(pastBookings);
  show(homeBtn);
  show(mainGreeting);
  hide(userBookings);
  hide(newBookings);
  hide(customerLogin);
  hide(pastBookingsBtn);
  hide(roomToBook);
  hide(availableRooms);
}

function showPotentialBooking(event) {
  if (event.target.classList.contains("book-button")) {
    show(homeBtn);
    show(roomToBook);
    show(navigation);
    show(mainGreeting);
    show(pastBookingsBtn);
    hide(pastBookings);
    hide(userBookings);
    hide(totalSpent);
    hide(newBookings);
    hide(customerLogin);
    hide(availableRooms);
    showSelectedRoom(event);
  }
}

function generateCustomerBookings() {
  let currentDate = new Date().toJSON().slice(0, 10);
  let userID = parseInt(username.value.slice(8, username.value.length));
  customer = new Customer(userID);
  customer.getName(customersData);
  mainGreeting.innerText = `Welcome ${customer.name}!`;
  hotel.findExistingBookings(customer).forEach((booking) => {
    if (booking.date.split("/") < currentDate.split("-")) {
      pastBookings.innerHTML += `<section class="room-booking">
          <h3 class="room-title">Date of Stay: ${booking.date} </h3>
          <p class="room-${booking.roomNumber}-details"> Room #: ${
        booking.roomNumber
      }
          <br> Cost: $${booking.cost}<br>Room Type: ${booking.roomType}</p>
          <img src="${assignRoomPhoto(booking.roomType)}" class="room-photo">
          </section>`;
    } else if (booking.date.split("/") >= currentDate.split("-")) {
      noVisits.innerHTML = "";
      userBookings.innerHTML += `<section class="room-booking">
          <h3 class="room-title">Date of Stay: ${booking.date} </h3>
          <p class="room-${booking.roomNumber}-details"> Room #: ${booking.roomNumber}
          <br> Cost: $${booking.cost}<br>Room Type: ${booking.roomType}</p>
          </section>`;
    }
    totalSpent.innerHTML = `Total Lifetime Bookings: ${hotel.findTotalCost(
      customer
    )}`;
  });
}

function generateAvailableRooms() {
  let userDate = searchDate.value.split("-").join("/");
  let roomSize = roomStyle.value;
  hotel.availableRoomsByDate(userDate);
  if (!userDate || !roomSize) {
    availableRooms.innerHTML = '';
    availableRooms.innerText = `PLEASE SELECT BOTH ARRIVAL DATE AND ROOM TYPE.`;
    return;
  } else if (hotel.availableRooms.length === 0) {
    availableRooms.innerHTML = '';
    availableRooms.innerText = `WE APOLOGIZE, THERE ARE NO ROOMS AVAILABLE THAT MATCH YOUR REQUEST. PLEASE SELECT A DIFFERENT DATE OR ROOM TYPE.`;
  }
  availableRooms.innerHTML = "";
  hotel.availableRooms.forEach((room) => {
    if (room.roomType === roomSize) {
      availableRooms.innerHTML += `<section class="room-booking">
        <h3 class="room-title">Room #: ${room.number}</h3>
        <img src="${assignRoomPhoto(room.roomType)}" class="room-photo">
        <p class="room-${room.number}-details">Room Type: ${ room.roomType} <br> Bed Size: ${room.bedSize} 
        <br> Number of Beds: ${room.numBeds} <br> Cost per night: $${room.costPerNight}</p>
        <button class="book-button" id="${room.number}">BOOK ROOM</button>
      </section>`;
    }
  });
}

function showSelectedRoom(event) {
  const roomDetail = roomsData.find(
    (room) => event.target.id === `${room.number}`
  );
  room = new Room(
    roomDetail.number,
    roomDetail.roomType,
    roomDetail.bidet,
    roomDetail.bedSize,
    roomDetail.numBeds,
    roomDetail.costPerNight
  );
  roomToBook.innerHTML += `
      <h2 class="room-details-title">Room Details</h2>
      <img src="${assignRoomPhoto(room.roomType)}" class="room-details-photo">
      <p class="room-details-${room.number}">Room #: ${room.number} <br> Room Type: ${room.roomType} 
      <br> Bed Size: ${room.bedSize} <br> Number of Beds: ${room.numBeds} <br> Cost per night $${room.costPerNight}</p>
      <button class="confirm-booking-button" id="confirmBooking">CONFIRM BOOKING</button>`;
}

function bookingPost() {
  let date = searchDate.value.split("-").join("/");
  booking = new Booking(customer, date, room);
  fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userID: booking.userID,
      date: date,
      roomNumber: booking.roomNumber,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "There was an error processing your booking, please retry or check back later"
        );
      } else {
        roomToBook.innerHTML = '';
        roomToBook.innerHTML += `THANKS FOR BOOKING`;
        return response.json();
      }
    })
    .then(() => getData())
    .catch((err) => {
      roomToBook.innerHTML = `${err.message}`;
    });
}

function resetBookingFilters() {
  bookingDate.value = "";
  bookingRoom.value = "single room";
  availableRooms.innerHTML = "";
}

function assignRoomPhoto(roomType) {
  if (roomType === "junior suite") {
    return "./images/junior-suite.png";
  }
  if (roomType === "residential suite") {
    return "./images/residential-suite.png";
  }
  if (roomType === "single room") {
    return "./images/single-room.png";
  }
  if (roomType === "suite") {
    return "./images/suite.png";
  }
}
function generateDate() {
  let currentDate = new Date().toJSON().slice(0, 10);
  return currentDate;
}

function show(event) {
  event.classList.remove("hidden");
}

function hide(event) {
  event.classList.add("hidden");
}
