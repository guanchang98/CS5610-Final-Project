import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../services/users/users-thunks";

function RegisterScreen() {
  const { currentUser } = useSelector((state) => state.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const register = () => {
    try {
      dispatch(registerThunk({ username, password }));
      navigate("/profile");
    } catch (err) {
      console.log(err);
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
      <div className="form-group">
        <label>Password Validation</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
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
      </div>
      <button onClick={register} className="btn btn-primary">
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