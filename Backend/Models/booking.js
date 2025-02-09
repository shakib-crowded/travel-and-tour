const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  departure: {
    type: Date,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    default: 0,
  },
  preferredClass: {
    type: String,
    required: true,
  },
  meal: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  language: {
    type: String,
  },
  requests: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
