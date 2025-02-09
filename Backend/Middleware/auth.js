const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) return res.redirect("/auth/login");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user to request
    next();
  } catch (error) {
    res.clearCookie("auth_token");
    return res.redirect("/auth/login");
  }
};

module.exports = authenticateUser;
