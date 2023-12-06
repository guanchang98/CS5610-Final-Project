import React, {
    useEffect,
    useState
} from "react";
import {
    useSelector,
    useDispatch
} from "react-redux";
import {
    useNavigate
} from "react-router";
import {
    findAllUsersThunk,
    deleteUserThunk
} from "../services/users/users-thunks";
import {
    Link
} from "react-router-dom";
import "../index.css";

/**
 * Functional component representing user role ADMIN's homepage.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
function AdminScreen() {
    const {users} = useSelector((state) => state.users);
    const [allUsers, setAllUsers] = useState(users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteUser = async (id) => {
        await dispatch(deleteUserThunk(id));
    }

    const loadScreen = async () => {
        const response = await dispatch(findAllUsersThunk());
        setAllUsers(response.payload);
    }
    useEffect(() => {
        //Fetch all registered users for admin role
        loadScreen();
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
                                    <span className="wd-no-underline col-6">{user.username}</span>
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-sm btn-info">{user.role}</button>
                                <button className="btn btn-danger rounded-pill float-end mt-3" onClick={() => deleteUser(user._id)}>
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
