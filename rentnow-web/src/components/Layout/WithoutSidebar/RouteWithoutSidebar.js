import React from "react";
import { Route } from "react-router-dom";
import LayoutWithoutSidebar from "./LayoutWithoutSidebar";
import PrivateRoute from "../../../Auth/PrivateRoute";

const RouteWithoutSidebar = ({
  component: Component,
  title,
  isPrivate,
  ...rest
}) => {
  const RouteToRender = () => {
    if (isPrivate) {
      return (
        <LayoutWithoutSidebar>
          <PrivateRoute
            title={title}
            component={(props) => <Component {...props} />}
            {...rest}
          />
        </LayoutWithoutSidebar>
      );
    } else {
      return (
        <Route
          title={title}
          {...rest}
          render={(props) => (
            <LayoutWithoutSidebar>
              <Component {...props} />
            </LayoutWithoutSidebar>
          )}
        />
      );
    }
  };
  return RouteToRender();
};

export default RouteWithoutSidebar;
