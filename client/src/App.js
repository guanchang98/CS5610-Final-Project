import {BrowserRouter, Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import EditProfile from "./screens/profile/EditProfile";
// import NavigationSidebar from "./components/NavigationSideBar";
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

// import LoginButton from "./components/LoginButton";
import CartScreen from "./screens/CartScreen";
import WishlistScreen from "./screens/WishlistScreen";
import CurrentUserContext from "./components/current-user-context";

//userId={currentUser}
import NavBar from './components/navbar';

function App(){
    const currentUser = "anonymous";
//     const store = configureStore({reducer: { users: usersReducer}});
    const loggingIn = false;
//    const { currentUser } = useSelector((state) => state.users);
//    const loggingIn = currentUser === null?false:true;

    return (
            <BrowserRouter>
                <Provider store={store}>
                  <CurrentUserContext>
                    <div className="mt-2">
                        <div>
                            <NavBar/>
                        </div>

                    <div className="container mt-2">
                        {/* {
                            !loggingIn &&
                            <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                                <NavigationSidebar/>
                            </div>
                        } */}
                        <div
                            // className="col-9 col-md-9 col-lg-7 col-xl-6 mx-auto"
                            // className="col-9 col-md-9 col-lg-7 col-xl-6 mx-auto"
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
