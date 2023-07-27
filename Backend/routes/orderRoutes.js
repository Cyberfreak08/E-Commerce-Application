const { Router } = require("express");
const orderController = require("../controllers/orderController");
const router = Router();
const auth = require("../middleware/auth");

router.get("/order", auth, orderController.getOrdersByUserId);
router.post("/order/current", auth, orderController.checkout);

module.exports = router;
