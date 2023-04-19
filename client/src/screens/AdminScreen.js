import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { findAllUsersThunk,deleteUserThunk } from "../services/users/users-thunks";
import {Link} from "react-router-dom";
import "../index.css";

function AdminScreen() {
  const { currentUser, users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // if (!currentUser || currentUser.role !== 'ADMIN') {
  //     navigate('/login');
  // }
  const deleteUser = async (id) => {
    await dispatch(deleteUserThunk(id));
  }
  useEffect(() => {
    dispatch(findAllUsersThunk());
  }, []);
  return (
    <div>
      <h1>Welcome, admin!</h1>
      <ul className="list-group">
        {users && users.map((user) => {
          return (
            <div key={user._id} className="card mt-2 row">
            <div className="col">
            <Link to={`/profile/${user._id}`} className="btn btn-link">
                <img src={user.avatar} width="60px"/>
            </Link>
            <Link to={`/profile/${user._id}`} className="btn">
                <span className="wd-no-underline">{user.username}</span>
            </Link>
            
            {/* <span> {user.bio} </span> */}
                            
            <span className="bold blue">{user.role}</span>
            <button className="btn btn-danger rounded-pill float-end mt-3">
                Delete
            </button>    
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default AdminScreen;
