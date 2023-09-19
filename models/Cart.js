const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for association
    required: true,
  },
  products: [
    {
      productName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model for association
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
  purchasedOn: {
    type: Date,
    default: Date.now,
  },
});

// Calculate the totalAmount before saving
cartSchema.pre('save', function (next) {
  const productsTotal = this.products.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
  this.totalAmount = productsTotal;
  next();
});
  
  module.exports = mongoose.model("Cart", cartSchema);