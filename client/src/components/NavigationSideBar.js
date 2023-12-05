import React from "react";
import {
    Link
} from "react-router-dom";
import {
    useLocation
} from "react-router";

const NavigationSidebar = () => {
    const {pathname} = useLocation();
    const paths = pathname.split("/");
    const active = paths[1];
    return (
        <div className="container">
            <div className="list-group mb-3">
                <Link
                    to="/home"
                    className={`list-group-item ${active === "home" || active === "search" || active === "details" ? "active" : ""}`}
                >
                    Home
                </Link>
                <Link
                    to="/profile"
                    className={`list-group-item ${active === "profile" ? "active" : ""}`}
                >
                    Profile
                </Link>
                <Link
                    to="/wishlist"
                    className={`list-group-item ${active === "wishlist" ? "active" : ""}`}
                >
                    Wishlist
                </Link>
                <Link
                    to="/cart"
                    className={`list-group-item ${active === "cart" ? "active" : ""}`}
                >
                    Cart
                </Link>
            </div>
        </div>

    );
};
export default NavigationSidebar;
