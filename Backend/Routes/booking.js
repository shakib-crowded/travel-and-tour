const express = require("express");
const router = express.Router({ mergeParams: true });
const authenticateUser = require("../Middleware/auth");
const bookingController = require("../Controller/booking");

router.get("/", authenticateUser, bookingController.renderBookingPage);
router.post("/", bookingController.createBooking);

module.exports = router;
