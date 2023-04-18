import React from "react";
// import {Link} from "react-router-dom";
import {useLocation} from "react-router";
// import SearchBar from './SearchBar.js'; 
import LoginButton from './LoginButton'; 


const NavBar = () => {
    const {pathname} = useLocation();
    const paths = pathname.split("/");
    // const active = paths[1];
    // console.log(paths);
    // const loggingIn = false;

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand f" href="/home">Shopping</a>
                <button className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarToggleMenu"
                        aria-controls="navbarToggleMenu" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id='navbarToggleMenu'>
                    <ul className="navbar-nav ms-auto">
                        <li>
                            <a className="nav-link active" href="/home">Home</a>
                        </li>
                        <li>
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                        <li>
                            <a className="nav-link" href="/waitlist">Waitlist</a>
                        </li>
                        <li>
                            <a className="nav-link" href="/cart">Cart</a>
                        </li>
                        {/* <li>
                            <a className="nav-link" href="/register">Register</a>
                        </li>
                        <li>
                            <a className="nav-link" href="/login">Login</a>
                        </li> */}
                        <li>
                            <LoginButton />
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;