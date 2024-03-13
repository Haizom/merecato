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
    const { firstName, lastName, email, phone, location, birthday, password } = req.body;

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
        location,
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

// Updating user and adding image
const updateUserInfo = asyncHandler(async (req, res) => {
    const { firstName, lastName, phone, location, birthday } = req.body;
    // console.log(req.body)

    const profileImage = req.file ? req.file.filename : null; 

    const userId = req.user.id; 
    // console.log(userId)

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phone = phone || user.phone;
        user.location = location || user.location;
        user.birthday = birthday || user.birthday;

        if (profileImage) {
            user.image = profileImage;
        }

        await user.save();

        res.status(200).json({ message: 'User information updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = {
    registerUser,
    login,
    logout,
    updateUserInfo
};