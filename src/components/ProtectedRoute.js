import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  const [value, setValue] = React.useState(false);
  React.useMemo(() => {
    if (value) {
      props.onLoginClick();
    }
  }, [value]);

  return (
    <Route>
      {() =>
        props.isLoggedIn ? (
          <Component {...props} />
        ) : (
          () => {
            setValue(true);
            return <Redirect to="/" />;
          }
        )
      }
    </Route>
  );
}

export default ProtectedRoute;
