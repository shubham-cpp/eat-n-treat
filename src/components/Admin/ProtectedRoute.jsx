import React from "react";
import { Route, Redirect, useParams } from "react-router-dom";

const ProtectedRoute = ({
  auth,
  pathname,
  exact,
  matchID,
  component: Component,
  ...rest
}) => {
  const { id } = useParams();
  console.log(id + "   " + matchID);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth && id === matchID ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: pathname,
            }}
          />
        )
      }
      exact={exact}
    />
  );
};

export default ProtectedRoute;
