const Query = require("../Models/query");

exports.renderQueryPage = (req, res) => {
  res.render("query");
};

exports.createQuery = async (req, res) => {
  try {
    const { name, email, date, destination, specialRequest } = req.body;
    const newQuery = new Query({
      name,
      email,
      date,
      destination,
      specialRequest,
    });
    await newQuery.save();
    res.status(201).json({ message: "Query submitted successfully !" });
  } catch (error) {
    res.status(500).json({ error: "Error saving query" });
  }
};
