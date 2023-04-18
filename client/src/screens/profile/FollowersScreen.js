import React, { useEffect, useState } from 'react';
import UserItem from "../../components/UserItem";
import BackButtonComponent from "../../components/BackButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  userFollowsUserThunk,
  findFollowsByFollowerIdThunk,
  findFollowsByFollowedIdThunk,
} from "../../services/users/follows-thunks";
import {
  profileThunk,
  logoutThunk,
  updateUserThunk,
} from "../../services/users/users-thunks";


const FollowersScreen = () => {
    const {follows} = useSelector((state) => state.follows);
    const [followers,setFollowing] = useState(follows);
//      const [followers,setFollowing] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const fetchProfile = async () => {
        const response = await dispatch(profileThunk());
        setProfile(response.payload);
    };
    const fetchFollowing = async () => {
        const response = await dispatch(findFollowsByFollowedIdThunk(currentUser._id));
        setFollowing(response.payload);
    };

    const loadScreen = async () => {
          await fetchProfile();
          await fetchFollowing();
    };

    useEffect(() => {
        loadScreen();
    }, []);

    return (
        <div>
            <BackButtonComponent/>
            <h1>Followers</h1>
            <ul className="list-group">
                                    {
                                        follows?.map(user =>
                                            <UserItem
                                                key={user.id} user={user}/> )
                                    }
                        </ul>
        </div>
    )
}

export default FollowersScreen;