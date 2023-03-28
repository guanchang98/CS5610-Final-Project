import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import HomePage from "./home/HomePage";
import ProfilePage from "./profile/ProfilePage";
import NavigationSidebar from "./components/NavigationSideBar";

function App() {
  return (
    <BrowserRouter>
      <div className="row mt-2">
        <div className="col-2 col-md-2 col-lg-1 col-xl-2">
          <NavigationSidebar active="explore" />
        </div>
        <div
          className="col-10 col-md-10 col-lg-7 col-xl-6"
          style={{ position: "relative" }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
