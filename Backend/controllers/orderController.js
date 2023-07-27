const Order = require("../models/Order");
const CartItems = require("../models/Cartitems");
const User = require("../models/User");

module.exports.checkout = async (req, res) => {
  try {
    const userId = req?.user.id;
    const params = req.body;
    let cart = await CartItems.findAll({ where: { userId } });
    let user = await User.findByPk(userId);
    const revisedCart = cart.reduce((acc, item) => {
      acc.push({ productId: item.productId, quantity: item.quantity });
      return acc;
    }, []);
    if (cart) {
      const createOrder = {
        userId: userId,
        items: JSON.stringify(revisedCart),
        date_ordered: new Date(),
        billAmount: params.total,
      };
      const order = await Order.create(createOrder);
      return res.status(200).json(order);
    } else {
      res.status(500).send("You do not have items in cart");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    if (userId) {
      const order = await Order.findAll({ where: { userId } });
      const items = order.reduce((acc, product) => {
        const products = JSON.parse(product?.items);
        acc.push({
          id: product.id,
          date_ordered: product.date_ordered,
          numberOfItems: products.length,
          price: product.billAmount,
        });
        return acc;
      }, []);
      return res.status(200).json(items);
    } else {
      res.status(500).send("You do not have items in cart");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
