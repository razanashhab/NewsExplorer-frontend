import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, onLoginClick, ...props }) {
  React.useEffect(() => {
    !isLoggedIn && onLoginClick();
  }, []);

  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to={"/"} />}</Route>
  );
}

export default ProtectedRoute;
