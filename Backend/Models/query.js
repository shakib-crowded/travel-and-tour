const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  destination: { type: String, required: true },
  specialRequest: { type: String },
});

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
