const express = require("express");
const userEnterController = require("../Controller/userEnter");

const router = express.Router();

router.get("/signup", userEnterController.renderRegisterPage);

router.post("/signup", userEnterController.registerUser);

router.get("/login", userEnterController.renderLoginPage);

// User Login
router.post("/login", userEnterController.loginUser);
// User Logout
router.get("/logout", userEnterController.logoutUser);

module.exports = router;
