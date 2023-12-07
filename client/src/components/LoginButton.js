import React from "react";
import {
    Link
} from "react-router-dom";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useNavigate
} from "react-router";
import {
    logoutThunk
} from "../services/users/users-thunks";

const LoginButton = () => {
    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await dispatch(logoutThunk());
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    };
    return currentUser?(
           <div>
              <button  className="btn btn-link float-end"
                 onClick={logout}>Logout</button>
              <div className="float-end">Welcome, {currentUser.username}</div>
           </div>
           ):(
            <div className="wd-link-container">
              <a href="/register">Register</a>
              <span>/ </span>
              <a href="/login">Login</a>
            </div>
           );
}

export default LoginButton;