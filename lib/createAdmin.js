require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../models/AdminModel");

const createAdmin = async () => {
  try {
    mongoose.set("strictQuery", false); // Add this line

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminData = {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
      email: process.env.ADMIN_EMAIL,
    };

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin already exists");
      mongoose.connection.close();
      return;
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    adminData.password = await bcrypt.hash(adminData.password, salt);

    const admin = new Admin(adminData);
    await admin.save();
    console.log("Admin created successfully");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

createAdmin();
