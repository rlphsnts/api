const mongoose = require("mongoose");

/* SCHEMA */
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name REQUIRED!"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name REQUIRED!"]
    },
    email: {
        type: String,
        required: [true, "Email REQUIRED!"]
    },
    userName: {
        type: String,
        required: [true, "Username REQUIRED!"]
    },
    password: {
        type: String,
        required: [true, "Password REQUIRED!"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

/* File Connection to Mongoose */
module.exports = mongoose.model("User", userSchema)