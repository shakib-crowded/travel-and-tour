const User = require("../Models/userEnter");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.renderRegisterPage = (req, res) => {
  res.render("sign-up");
};

exports.renderLoginPage = (req, res) => {
  res.render("login");
};

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .send(
          "<script>alert('Passwords do not match'); window.history.back();</script>"
        );
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send(
          "<script>alert('User already exists'); window.history.back();</script>"
        );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    res.send(
      "<script>alert('Registration successful!'); window.location.href='/auth/login';</script>"
    );
  } catch (err) {
    res
      .status(500)
      .send(
        "<script>alert('Server error, try again!'); window.history.back();</script>"
      );
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send(
          "<script>alert('Invalid Email or Password, try again!')</script>"
        );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send("<script>alert('Invalid Password, try again!')</script>");
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });

    res
      .status(200)
      .send(
        "<script>alert('Login successful!'); window.location.href='/';</script>"
      );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("auth_token"); // Remove the JWT cookie
  res.send(
    "<script>alert('Logout successful!'); window.location.href='/auth/login';</script>"
  );
};
