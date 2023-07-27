import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { router } from "./routes";

const ProtectedRoute = (props) => {
  const { result } = props;
  if (result) {
    return <Outlet />;
  }
  return <Navigate to={router.login} />;
};

ProtectedRoute.propTypes = {
  user: PropTypes.string,
};

export default React.memo(ProtectedRoute);
