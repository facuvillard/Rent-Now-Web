import React from "react";
import { Route } from "react-router-dom";
import LayoutWithSidebar from "./LayoutWithSidebar";
import PrivateRoute from "../../../Auth/PrivateRoute";

const RouteWithSidebar = ({
  component: Component,
  title,
  isPrivate,
  ...rest
}) => {
  const RouteToRender = () => {
    if (isPrivate) {
      return (
        <LayoutWithSidebar>
          <PrivateRoute
            title={title}
            component={(props) => <Component {...props} />}
            {...rest}
          />
        </LayoutWithSidebar>
      );
    } else {
      return (
        <Route
          title={title}
          {...rest}
          render={(props) => (
            <LayoutWithSidebar>
              <Component {...props} />
            </LayoutWithSidebar>
          )}
        />
      );
    }
  };
  return RouteToRender();
};

export default RouteWithSidebar;
