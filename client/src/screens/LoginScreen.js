import {
    Link
} from "react-router-dom";
import React, {
    useState,
    useEffect
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useNavigate
} from "react-router";
import {
    loginThunk
} from "../services/users/users-thunks";

/**
 * Functional component representing login screen.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const LoginScreen = () => {
    const {currentUser} = useSelector((state) => state.users);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async () => {
        try {
            const user = await dispatch(loginThunk({username, password}));
            if (user.payload.role === "ADMIN"){
                navigate("/admin");
            }
            else{
                navigate("/profile");
            }
            
        } catch (err) {
            console.log(err);
            alert("user not found!");
        }
    };
    return (
        <div>
            <h3>Sign In</h3>
            <div className="form-group mt-3">
                <label>User Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
            </div>
            <div className="form-group mt-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>

            <div className="d-grid gap-2 mt-3">
                <button onClick={login} className="btn btn-primary">
                    Login
                </button>

            </div>
        </div>
    )
}

export default LoginScreen;