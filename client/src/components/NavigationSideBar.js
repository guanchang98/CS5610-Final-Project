import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const NavigationSidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const paths = pathname.split("/");
  const active = paths[1];
  return (
      <div className="container">
          <div className="list-group mb-3">
              <Link
                  to="/home"
                  className={`list-group-item ${active === "home" || active === "search" ? "active" : ""}`}
              >
                  Home
              </Link>
              <Link
                  to="/profile"
                  className={`list-group-item ${active === "profile" ? "active" : ""}`}
              >
                  Profile
              </Link>
          </div>
      </div>

  );
};
export default NavigationSidebar;
