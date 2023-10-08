const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.DB_CONNECTION;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 100,
      minPoolSize: 0,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = connectToMongoDB;
