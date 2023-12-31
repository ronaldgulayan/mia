import React from "react";
import { Link } from "react-router-dom";

function CustomLink({
  url = "",
  className = "",
  children,
  onClick = () => {},
  tabIndex = 0,
  type = "button",
}) {
  if (!url) {
    return (
      <button
        tabIndex={tabIndex}
        onClick={onClick}
        className={
          "text-main underline-offset-4 hover:underline w-fit " + className
        }
        type={type}
      >
        {children}
      </button>
    );
  }
  return (
    <Link
      onClick={onClick}
      className={
        "text-main underline-offset-4 hover:underline w-fit " + className
      }
      to={url}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
