import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import "../index.css";
import {
  userUnfollowsUser,
} from "../services/users/follows-service";
import { useDispatch, useSelector } from "react-redux";

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
    const { currentUser } = useSelector((state) => state.users);
const unfollowUser = async () => {
        await userUnfollowsUser(currentUser._id, user._id);
    };

    return (
        <div className="card mt-2 row">
            <div className="col">
                <Link to={`/profile/${user.id}`} className="btn btn-link">
                    <img src={user.avatar} width="60px"/>
                </Link>
                <Link to={`/profile/${user.id}`} className="btn">
                    <span className="wd-no-underline">{user.name}</span>
                </Link>
                {
                    <button onClick={userUnfollowsUser} className="btn btn-danger rounded-pill float-end mt-3">
                        Unfollow
                    </button>
                }
            </div>
        </div>
    );
}

export default UserItem;