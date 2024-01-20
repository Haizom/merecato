const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        birthday: {
            type: Date,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        }, {
        timestamps: true,
    });

const User = mongoose.model('User', userSchema);

module.exports = User;
