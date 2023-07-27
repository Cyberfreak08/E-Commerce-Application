import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { router } from "./utils/routes";
import useProtectedRoute from "./utils/protectedRoute";
import ProtectedRoute from "./utils/auth";
import OrderConfirmation from "./Components/Orderconfirmation";
import { useSelector } from "react-redux";
import Orders from "./Components/Orders";
import Profile from "./Components/Profile";
const App = () => {
  const payment = useSelector((state) => state?.reducer?.user?.payment);
  const success = useSelector((state) => state?.reducer?.user?.success);

  const result = useProtectedRoute();
  return (
    <Router>
      <Routes>
        <Route path={"*"} element={<div>Page not found</div>} />

        <Route>
          <Route path={router.default} element={<ProductList />} />
          <Route
            path={router.login}
            element={
              result && success ? <Navigate to={router.products} /> : <SignIn />
            }
          />
          <Route
            path={router.register}
            element={
              result && success ? <Navigate to={router.products} /> : <SignUp />
            }
          />
          <Route path={router.products} element={<ProductList />} />
        </Route>

        <Route
          element={
            result ? (
              <ProtectedRoute result={result} />
            ) : (
              <Navigate to={router.products} />
            )
          }
        >
          <Route path={router.profile} element={<Profile />} />
          <Route path={router.cart} element={<Cart />} />
          <Route path={router.allOrders} element={<Orders />} />
          <Route
            path={router.payment}
            element={
              payment ? (
                <OrderConfirmation />
              ) : (
                <Navigate to={router.products} />
              )
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
