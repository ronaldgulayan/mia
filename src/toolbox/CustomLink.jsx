import React from "react";
import { Link } from "react-router-dom";

function CustomLink({
  url = "#",
  className = "",
  children,
  onClick = () => {},
}) {
  return (
    <Link
      onClick={onClick}
      className={"text-main underline-offset-4 hover:underline " + className}
      to={url}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
