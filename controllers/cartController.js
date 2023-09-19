const User = require("../models/User");
const Product = require("../models/Product")
const Cart = require("../models/Cart")
const bcrypt = require("bcrypt");
const auth = require("../auth");


// module.exports.cartOrder = async (req, res) => {
//   try {
//     const items = item;

//     // Create a new cart order
//     const cart = new Cart({
//       products: [] // Initialize products as an empty array
//     });

//     // Iterate through the items in the request body
//     for (const item of items) {
//       const { productName, quantity } = item;

//       // Find the product by productName in the database
//       const product = await Product.findOne({ productName: req.body.productName });

//       if (!product) {
//         return res.status(404).json({ message: `Product not found for ${productName}` });
//       }

//       // Add the product to the cart with its productId and price
//       cart.products.push({
//         productId: product._id, // Assuming your Product model has an '_id' field
//         quantity,
//         price: product.price,
//       });
//     }

//     // Calculate the totalAmount based on the quantity and price
//     cart.totalAmount = cart.products.reduce((total, product) => {
//       return total + product.quantity * product.price;
//     }, 0);

//     // Save the cart to the database
//     await cart.save();

//     res.status(201).json({ message: 'Cart order created successfully', cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

/* Add to Cart */
module.exports.addCart = async (req, res) => {
  try {
    const { productName, quantity } = req.body;

    // Find the product by its name (assuming productName is unique)
    const product = await Product.findOne({ productName });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { _id, description, price } = product;
    const totalPrice = price * quantity;

    // Create a new cart item
    const newCart = new Cart({
      userId: req.user.id,
      productId: _id,
      name: productName,
      description,
      quantity,
      price: totalPrice,
    });

    // Save the new cart item to the database
    await newCart.save();

    // Return detailed information about the added product
    res.status(201).json({
      message: 'Item added to the cart successfully',
      addedProduct: {
        _id,
        productDescription: description,
        price,
        totalPrice
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};










