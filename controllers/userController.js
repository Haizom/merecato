const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = { id: user.id };
    const options = { expiresIn: '1y' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    res.status(200).json({ token, user: user});
});


// Register
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, birthday, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        phone,
        birthday,
        password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
});


// Logout -- just for checking the auth middleware
const logout = asyncHandler(async (req, res) => {

    // blacklist ?

    res.status(200).json({ message: 'Logout successful' });
});

module.exports = {
    registerUser,
    login,
    logout
};