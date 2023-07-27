const { Router } = require("express");
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");
const router = Router();

router.get("/cart",auth, cartController.get_cart_items);
router.post("/cart", auth, cartController.add_cart_item);
router.delete("/cart/:itemId", auth, cartController.delete_item);
router.delete("/cart", auth, cartController.empty_cart);
router.post('/payment',auth, cartController.payment);
module.exports = router;
 