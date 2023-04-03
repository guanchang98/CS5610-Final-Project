import {BrowserRouter, Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import HomePage from "./home/HomePage";
import ProfilePage from "./profile/ProfilePage";
import NavigationSidebar from "./components/NavigationSideBar";
import DetailsPage from "./details/DetailsPage";
import LoginPage from "./screens/LoginPage";
import FollowersPage from "./profile/FollowersPage";
import FollowingPage from "./profile/FollowingPage";
import {configureStore} from "@reduxjs/toolkit";
import isLoggingReducer from "./reducers/isLogging-reducer";
import {Provider, useSelector} from "react-redux";
import store from "./reducers/store"
import RegisterScreen from "./screens/RegisterScreen";
import LoginButton from "./components/LoginButton";


function App() {
    const currentUser = "anonymous";
//     const store = configureStore({reducer: { users: usersReducer}});
    const loggingIn = false;
//    const { currentUser } = useSelector((state) => state.users);
//    const loggingIn = currentUser === null?false:true;

    return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className="row mt-2">
                        {
                            !loggingIn &&
                            <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                                <NavigationSidebar/>
                            </div>
                        }
                        <div
                            className="col-9 col-md-9 col-lg-7 col-xl-6 mx-auto"
                            style={{position: "relative"}}
                        >
                            <Routes>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="home" element={<HomePage/>}/>
                                <Route path="search" element={<HomePage/>}/>
                                <Route path="profile" element={<ProfilePage/>}/>
                                <Route path="profile" element={<ProfilePage userID={currentUser}/>}/>
                                <Route path="profile/:profileId" element={<ProfilePage/>}/>
                                <Route path="details/:detailsId" element={<DetailsPage/>}/>
                                <Route path="login" element={<LoginPage/>}/>
                                <Route path="profile/following" element={<FollowingPage/>}/>
                                <Route path="profile/followers" element={<FollowersPage/>}/>
                                <Route path="/register" element={<RegisterScreen />} />
                            </Routes>
                        </div>
                        {
                            !loggingIn &&
                            <div className="container col-1 col1-md-1 col-lg-3 col-xl-3">
                                <LoginButton/>
                            </div>
                        }
                    </div>
                </Provider>
            </BrowserRouter>

    );
}

export default App;
