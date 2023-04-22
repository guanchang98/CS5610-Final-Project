import React, {useEffect} from "react";
// import {Link} from "react-router-dom";
import {useLocation} from "react-router";
// import SearchBar from './SearchBar.js'; 
import LoginButton from './LoginButton';
import {useSelector} from "react-redux";


const NavBar = () => {
    const {pathname} = useLocation();
    const paths = pathname.split("/");
    const active = paths[1];
    const {currentUser} = useSelector(state => state.users);

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser])


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
                            <a className={`nav-link ${(active === 'home' || active === 'search') ? 'active' : ''}`} href="/home">Home</a>
                        </li>
                        <li>
                            <a className={`nav-link ${active === 'profile' ? 'active' : ''}`} href="/profile">Profile</a>
                        </li>
                        <li>
                            {
                                currentUser && currentUser.role === "SELLER" &&
                                <a className={`nav-link ${active === 'wishlist' ? 'active' : ''}`} href="/wishlist">ProductList</a>
                            }
                            {
                                (!currentUser || (currentUser && currentUser.role === "BUYER")) &&
                                <a className={`nav-link ${active === 'wishlist' ? 'active' : ''}`} href="/wishlist">Wishlist</a>
                            }
                        </li>
                        <li>
                            {
                                (!currentUser || (currentUser && currentUser.role === "BUYER")) &&
                                <a className={`nav-link ${active === 'cart' ? 'active' : ''}`} href="/cart">Cart</a>
                            }

                        </li>
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