import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js"; // Adjust the path as necessary
import dotenv from "dotenv";
import connectDB from "./config/db.connect.js";
import colors from "colors";
import { seedUsers } from "./seed.data.js";

dotenv.config(); // Load environment variables from .env file

const seedDatabase = async () => {
  try {
    connectDB();

    await User.deleteMany({});
    console.log("Existing users removed");

    for (let user of seedUsers) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    await User.insertMany(seedUsers);
    console.log("Database seeded with users");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedDatabase();
