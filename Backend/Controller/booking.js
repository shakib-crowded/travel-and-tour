const Booking = require("../Models/booking");

// Render the booking page
exports.renderBookingPage = (req, res) => {
  res.render("booking");
};

// Handle New Booking Request
exports.createBooking = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      departure,
      adults,
      children,
      preferredClass,
      meal,
      emergencyContact,
      language,
      requests,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !departure ||
      !adults ||
      !preferredClass ||
      !meal ||
      !emergencyContact
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create a new booking
    const newBooking = new Booking({
      fullName,
      email,
      phone,
      departure,
      adults,
      children,
      preferredClass,
      meal,
      emergencyContact,
      language,
      requests,
    });

    await newBooking.save();

    // Send success response
    res.status(201).json({ success: true, message: "Booking successful!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving booking" });
  }
};
