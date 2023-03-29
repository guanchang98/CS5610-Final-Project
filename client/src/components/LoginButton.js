import React from "react";
import {Link} from "react-router-dom";
import {changeState} from "../reducers/isLogging-reducer";
import {useDispatch, useSelector} from "react-redux";

const LoginButton = () => {
    // const dispatch = useDispatch();
    // const loggingIn = useSelector(state => state.isLogging);
    // const isLoggingHandler = dispatch(changeState(loggingIn));
    return (
        <div>
            <Link to="/login" className="btn btn-link float-end"
                  onClick={() => {console.log("login")}}>Login/Register</Link>
            <div className="float-end">Anonymous</div>
        </div>
    )
}

export default LoginButton;