import React, {
    useState
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useNavigate
} from "react-router";
import {
    registerThunk
} from "../services/users/users-thunks";

/**
 * Functional component representing register screen.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
function RegisterScreen() {
  const { currentUser } = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("SELLER");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const register = async () => {
    if (!username || !password) {
          console.log("Missing required information!");
          alert("Missing required information!");
        }
    else {
        try {
              const response = await dispatch(registerThunk({ username:username, password:password, role:role}));
              if (response.error){
                alert("user already exists, redirect you to log in!");
                navigate("/login");
              }
              else{
                navigate("/profile");
              }
            } catch (err) {
              console.log(err);
              alert("user already exists, redirect you to log in!");
            }

    }

  };
  return (
    <div>
      <h1>Register</h1>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
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
      <div className="form-group mt-3">
          <label>Role</label>
          <select
                className="form-control"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}>
              <option value="SELLER">SELLER</option>
              <option value="BUYER">BUYER</option>
          </select>
      </div>
      <button onClick={register} className="btn btn-primary mt-3">
        Register
      </button>
      <div>
        {currentUser && (
          <div>
            <h2>{currentUser.username}</h2>
            <h2>{currentUser.password}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterScreen;
