const { constants } = require("fs/promises");
const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
  try {
    const cn = await mongoose.connect(
      process.env.DB_HOST
    );
    cn.STATES.connected
      ? console.log("MongoDB connection established")
      : console.log("Error connecting to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectDB
}
