const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.ATLASDB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
