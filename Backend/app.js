const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
require("dotenv").config();
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const upload = multer(); // Use memory storage for form data

// Requiring Routes
const aboutRouter = require("./Routes/about");
const bookingRouter = require("./Routes/booking");
const contactRouter = require("./Routes/contact");
const destinationsRouter = require("./Routes/destinations");
const packagesRouter = require("./Routes/packages");
const processRouter = require("./Routes/process");
const queryRouter = require("./Routes/query");
const servicesRouter = require("./Routes/services");
const testimonialsRouter = require("./Routes/testimonials");
const travel_guidesRouter = require("./Routes/travel-guides");
const userEnter = require("./Routes/userEnter");
connectDB();

const app = express();
app.use(cookieParser());

// Middleware
app.use(upload.none()); // Parse multipart form data
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.cookies.auth_token ? true : false;
  next();
});

app.set("views", path.join(__dirname, "../Frontend/Views/Pages"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../Frontend/Public")));
app.engine("ejs", ejsMate);

// Routes

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/about", aboutRouter);
app.use("/booking", bookingRouter);
app.use("/contact", contactRouter);
app.use("/destinations", destinationsRouter);
app.use("/packages", packagesRouter);
app.use("/process", processRouter);
app.use("/query", queryRouter);
app.use("/services", servicesRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/travel-guides", travel_guidesRouter);
app.use("/auth", userEnter);

// Connect to MongoDB

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
