import {BrowserRouter, Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import HomePage from "./home/HomePage";
import ProfilePage from "./profile/ProfilePage";
import NavigationSidebar from "./components/NavigationSideBar";
import DetailsPage from "./details/DetailsPage";
import LoginPage from "./login/LoginPage";
import {useState} from "react";
import FollowersPage from "./profile/FollowersPage";
import FollowingPage from "./profile/FollowingPage";

function App() {
    const currentUserID = "anonymous";
    const [loggingIn, setLoggingIn] = useState(false);

    return (
        <BrowserRouter>
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
                        <Route path="profile" element={<ProfilePage userID={currentUserID}/>}/>
                        <Route path="profile/:profileId" element={<ProfilePage/>}/>
                        <Route path="details/:detailsId" element={<DetailsPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="profile/following" element={<FollowingPage/>}/>
                        <Route path="profile/followers" element={<FollowersPage/>}/>
                    </Routes>
                </div>
                {
                    !loggingIn &&
                    <div className="container col-1 col1-md-1 col-lg-3 col-xl-3">
                    <Link to="/login" className="btn btn-link float-end" onClick={() => setLoggingIn(true)}>Login/Register</Link>
                    <div className="float-end">Anonymous</div>
                </div>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
