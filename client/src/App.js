import {BrowserRouter, Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import EditProfile from "./screens/profile/EditProfile";
import DetailsScreen from "./screens/DetailsScreen";
import LoginScreen from "./screens/LoginScreen";
import FollowersScreen from "./screens/profile/FollowersScreen";
import FollowingScreen from "./screens/profile/FollowingScreen";
import EditProductScreen from './screens/EditProductScreen';
import CurrentUserScreen from "./screens/profile/CurrentUserScreen";
import {Provider, useSelector} from "react-redux";
import store from "./reducers/store"
import RegisterScreen from "./screens/RegisterScreen";
import AdminScreen from "./screens/AdminScreen";
import CartScreen from "./screens/CartScreen";
import WishlistScreen from "./screens/WishlistScreen";
import CurrentUserContext from "./components/current-user-context";

import NavBar from './components/navbar';

function App(){
    const currentUser = "anonymous";
    const loggingIn = false;

    return (
            <BrowserRouter>
                <Provider store={store}>
                  <CurrentUserContext>
                    <div className="mt-2">
                        <div>
                            <NavBar/>
                        </div>

                    <div className="container mt-2">
                        <div
                            style={{position: "relative"}}
                        >
                            <Routes>
                                <Route path="/" element={<HomeScreen/>}/>
                                <Route path="home" element={<HomeScreen/>}/>
                                <Route path="search" element={<HomeScreen/>}/>
                                <Route path="search/:searchString" element={<HomeScreen/>}/>
                                <Route path="profile" element={<ProfileScreen/>}/>
                                <Route path="edit-profile" element={<EditProfile/>}/>
                                <Route path="profile/:userId" element={<ProfileScreen/>}/>
                                <Route path="details/:detailsId" element={<DetailsScreen/>}/>
                                <Route path="login" element={<LoginScreen/>}/>
                                <Route path="following" element={<FollowingScreen/>}/>
                                <Route path="followers" element={<FollowersScreen/>}/>
                                <Route path="register" element={<RegisterScreen />} />
                                <Route path="wishlist" element={<WishlistScreen/>}/>
                                <Route path="admin" element={<AdminScreen/>}/>
                                <Route path="cart" element={<CartScreen/>}/>
                                <Route path="edit-product" element={<EditProductScreen/>}/>
                            </Routes>
                        </div>
                    </div>
                    </div>
                  </CurrentUserContext>
                </Provider>
            </BrowserRouter>
    );
}

export default App;
