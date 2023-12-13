import { useSelector } from "react-redux";
import instance from "../../utils/api";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { cartSelector } from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { router } from "../../utils/routes";
import { getCurrentOrder } from "../../Redux/orderSlice";

const PayButton = ({ total, handleOk, handleEmptyCart }) => {
  const cartItems = useSelector(cartSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = async (token) => {
    try {
      const response = await instance.post(`/payment`, {
        cartItems,
        token,
      });
      if (response.data.clientSecret) {
        handleOk();
        handleEmptyCart();
        dispatch(getCurrentOrder(total));
        navigate(`${router.payment}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StripeCheckout
      name="Shopping cart Checkout"
      amount={total * 100}
      currency="INR"
      stripeKey="pk_test_51Mef3dSCFEdAp1Q88d1K97TaQW42guXlOlgXMR8uOjWSCYDK8qCbLmZQfOOcXojrHeC8PiUMzg9Xi7ys8GYZqfSc00WWW76NiE"
      token={handleCheckout}
    >
      <Button>Proceed to Checkout</Button>
    </StripeCheckout>
  );
};

export default PayButton;
