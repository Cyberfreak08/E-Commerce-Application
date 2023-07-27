const Cart = require("../models/Cart");
const Item = require("../models/Item");
const CartItem = require("../models/Cartitems");
const { Op } = require("sequelize");
require("dotenv").config();
const sequelize = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.payment = async (req, res) => {
  const { cartItems, token } = req.body;
  const totalPrice = cartItems?.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: "tok_visa",
      },
      billing_details: {
        email: token.email,
      },
    });

    const customer = await stripe.customers.create({
      email: token.email,
      payment_method: paymentMethod.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "inr",
      customer: customer.id,
      payment_method: "pm_card_visa",
      receipt_email: token.email,
      description: req.user.id,
      confirm: true,
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Error: " + error);
    return res.status(500).json({ error: "Payment failed." });
  }
};

module.exports.get_cart_items = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({
      where: { userId: userId },
      include: [
        {
          model: CartItem,
          as: "cartItem",
          where: {
            cartId: {
              [Op.eq]: sequelize.col("cartId"),
            },
          },
        },
      ],
    });
    if (cart && cart?.cartItem.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.add_cart_item = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  try {
    // Find the item and check if it exists
    const item = await Item.findByPk(productId);
    if (!item) {
      return res.status(404).send("Item not found!");
    }

    // Find or create the cart for the user
    const [cart, created] = await Cart.findOrCreate({
      where: { userId },
      defaults: { bill: 0 },
    });

    // Find or create the cart item
    let [cartItem, isNewCartItem] = await CartItem.findOrCreate({
      where: { cartId: cart.id, productId },
      defaults: {
        userId,
        cartId: cart.id,
        itemName: item.title,
        quantity,
        price: item.price,
      },
    });

    // If the cart item already exists, update the quantity
    if (!isNewCartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
    }

    // Update the cart bill
    cart.bill += quantity * item.price;
    await cart.save();

    // Fetch the updated cart with cart items
    const updatedCart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: "cartItem",
          where: { cartId: cart.id },
        },
      ],
    });

    return res.status(201).send(updatedCart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.delete_item = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.itemId;
  try {
    let productItem = CartItem.findByPk(productId);
    if (productItem) {
      await CartItem.destroy({ where: { id: productId } });
    }
    return res.status(201).json({ message: "Item Removed successfully ..." });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.empty_cart = async (req, res) => {
  const userId = req.user.id;
  try {
    // Use a transaction to delete cart and cart items automatically
    await sequelize.transaction(async (transaction) => {
      await Cart.destroy({ where: { userId }, transaction });
      await CartItem.destroy({ where: { userId }, transaction });
    });

    return res.status(201).send("The cart is empty now...");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
