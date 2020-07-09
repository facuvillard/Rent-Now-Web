import React from "react";
import { Link } from "react-router-dom";

const LinkCustom = (props) => {
  return (
    <Link style={{ textDecoration: "none" }} to={props.to}>
      {props.children}
    </Link>
  );
};
export default LinkCustom;

