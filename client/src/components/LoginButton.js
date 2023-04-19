import React,{useEffect} from "react";
import {Link} from "react-router-dom";
import {changeState} from "../reducers/isLogging-reducer";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router";
import { logoutThunk } from "../services/users/users-thunks";

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

    return currentUser?(<div>
                                                                <button  className="btn btn-link float-end"
                                                                                  onClick={logout}>Logout</button>
                                                                <div className="float-end">Welcome, {currentUser.username}</div>
                                                            </div>):(<div>
                                                                                                          <Link to="/login" className="btn btn-link float-end"
                                                                                                                onClick={() => {console.log("login")}}>Login</Link>
                                                                                                          <Link to="/register" className="btn btn-link float-end"
                                                                                                                            onClick={() => {console.log("register")}}>Register</Link>
                                                                                                          <div className="float-end">Welcome, Anonymous</div>
                                                                                                      </div>);
}

export default LoginButton;