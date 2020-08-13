import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import { Can } from "Auth/can";
import PermissionDenied from "components/utils/PermissionDenied/PermissionDenied"
const PrivateRoute = ({
  component: RouteComponent,
  permiso,
  elemento,
  ...rest
}) => {
  const { currentUser } = useContext(AuthContext);
  const componentToRender = (routeProps) => {
    if (permiso && elemento) {
      return (
        <Can  I={permiso} a={elemento} passThrough>
          {(allowed) => {
            if (allowed) {
              return <RouteComponent {...routeProps} />;
            }
            return <PermissionDenied />
          }}
        </Can>
      );
    } else {
      return <RouteComponent {...routeProps} />;
    }
  };

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? componentToRender(routeProps) : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
