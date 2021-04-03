// Dependencies
const express = require("express");
const path = require("path");

// Sets up the Express App

const app = express();
const PORT = 3000;

// Variables
let tables = [];
let waitlist = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/add", (req, res) =>
  res.sendFile(path.join(__dirname, "tables.html"))
);

app.get("/add", (req, res) =>
  res.sendFile(path.join(__dirname, "reserve.html"))
);

// View Tables API
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

// Get Waitlist
app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

// Create New Reservation
app.post("/api/reserve", function (req, res) {
  console.log("Reserve request submitted.");
  console.log(req.body);

  var newReservation = req.body;

  var isBooked;
  if (tables.length <= 5) {
    isBooked = true;
    tables.push(newReservation);
  } else {
    isBooked = false;
    waitlist.push(newReservation);
  }

  res.json(isBooked);
});

// Clear all tables
app.post("/api/clear", function (req, res) {
  console.log("All tables cleared");
  tables = [];
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
