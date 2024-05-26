const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");

const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin by ID from the decoded token
    const admin = await Admin.findById(decoded.id);

    // Check if admin exists
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized, admin not found" });
    }

    // Attach the admin object to the request
    req.admin = admin;

    // Move to the next middleware
    next();
  } catch (error) {
    // Handle invalid token
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

module.exports = adminAuth;
