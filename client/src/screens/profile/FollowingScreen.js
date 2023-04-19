import React, { useEffect, useState } from 'react';
import UserItem from "../../components/UserItem";
import BackButtonComponent from "../../components/BackButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { findUserById } from "../../services/users/users-service";
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

const FollowingScreen = () => {
    const {follows} = useSelector((state) => state.follows);
    const [following,setFollows] = useState(follows);
//      const [following,setFollows] = useState([]);
    const  {currentUser}  = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const fetchProfile = async () => {
        const response = await dispatch(profileThunk());
        setProfile(response.payload);
    };
    const dispatch = useDispatch();
      const navigate = useNavigate();

    const fetchFollowers = async () => {
        const response = await dispatch(findFollowsByFollowerIdThunk(profile._id));
        setFollows(response.payload);
    };

    const loadScreen = async () => {
          await fetchProfile();
          fetchFollowers();

    };
      
    useEffect(() => {

                 loadScreen();

    }, []);
    return (
        <div>
            <BackButtonComponent/>
            <h1>Following</h1>
            <h1>{currentUser?.username}</h1>
            <ul className="list-group">
                        {
                            follows?.map(user =>
                                <UserItem
                                    key={user._id} user={user}/> )
                        }
            </ul>
        </div>
    )
}

export default FollowingScreen;