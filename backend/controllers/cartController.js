const User = require('../models/userModel');
const FoodItem = require('../models/foodItemModel');

// Add to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity} = req.body;

  try {
    // Find the product in the product collection
    const product = await FoodItem.findById(productId);

    if (!product || product.stock < quantity) {
      return res.status(400).json({ message: 'Product is out of stock or invalid.' });
    }

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the product is already in the cart
    const cartItem = user.cart.find(item => item.productId.equals(productId));

    if (cartItem) {
      // If product exists in the cart, update the quantity
      cartItem.quantity += quantity;
    } else {
      // If product is not in the cart, add it
      user.cart.push({
        productId: product._id,
        foodName: product.foodName,
        price: product.price, // Store price at the time of adding to cart
        quantity: quantity,
        image:product.imageUrl
      });
    }

    await user.save();
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch Cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const cartWithUpdatedStock = await Promise.all(user.cart.map(async (cartItem) => {
      const product = await FoodItem.findById(cartItem.productId);

      return {
        productId: cartItem.productId,
        foodName: cartItem.foodName,
        quantity: cartItem.quantity,
        price: cartItem.price,
        image:cartItem.image,
        currentStock: product.stock, // Fetch the latest stock
        updatedPrice: product.price   // Optionally show latest price
      };
    }));

    res.json({ cart: cartWithUpdatedStock });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Checkout Cart
exports.checkoutCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    let total = 0;
    const updatedCart = await Promise.all(user.cart.map(async (cartItem) => {
      const product = await FoodItem.findById(cartItem.productId);

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({ message: `Product ${product.productName} is out of stock.` });
      }

      // Calculate total cost
      total += product.price * cartItem.quantity;

      // Optionally update the price in the cart if it's different from the current price
      cartItem.price = product.price;

      // Deduct the stock from product
      product.stock -= cartItem.quantity;
      await product.save();

      return cartItem;
    }));

    // Clear the user's cart after successful checkout
    user.cart = [];
    await user.save();

    res.json({ message: 'Checkout successful', total, cart: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
