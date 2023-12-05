import React, {
    useEffect,
    useState
} from 'react';
import {
    Link
} from "react-router-dom";
import "../index.css";
import {
    userUnfollowsUserThunk,
} from "../services/users/follows-thunks";
import {
    useDispatch,
    useSelector
} from "react-redux";

const UserItem = (
    {
        user = {
            "id": "u111111",
            "name": "user1",
            "avatar": "../images/avatar_man.png",
            "followed": true,
            "bio": "test bio"
        }
    }
) => {
        const dispatch = useDispatch();
        const { currentUser } = useSelector((state) => state.users);
        const unfollowUser = async () => {
            await dispatch(userUnfollowsUserThunk({follower:currentUser._id, followed:user._id}));
        };

    return (
        <div className="card mt-2 row">
            <div className="col">
                <Link to={`/profile/${user._id}`} className="btn btn-link">
                    <img src={user.avatar} width="60px"/>
                </Link>
                <Link to={`/profile/${user._id}`} className="btn">
                    <span className="wd-no-underline">{user.username}</span>
                </Link>
                {currentUser && currentUser.role === "BUYER" &&
                    <button onClick={unfollowUser} className="btn btn-danger rounded-pill float-end mt-3">
                        Unfollow
                    </button>
                }
                {currentUser && currentUser.role === "SELLER" &&
                                    <span> {user.bio} </span>
                                }
            </div>
        </div>
    );
}

export default UserItem;