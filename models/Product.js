const mongoose = require("mongoose");

/* SCHEMA */
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please input product name"]
    },
    productCategory: {
        type: String,
        required: [true, "Please input product category"]
    },
    productDescription: {
        type: String,
        required: [true, "Please provide product description"]
    },
    price: {
        type: Number,
        required: [true, "Please indicate product price"]
    },
    quantity: {
        type: Number,
        required: [true, "Please indicate available stocks"]
    },
    dateReceived: {
        type: Date,
        default: new Date()
    },
    isActive: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model("Product", productSchema)