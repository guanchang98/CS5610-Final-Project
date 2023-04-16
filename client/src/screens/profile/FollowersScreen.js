import React, { useEffect, useState } from 'react';
import UserItem from "../../components/UserItem";
import BackButtonComponent from "../../components/BackButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  userFollowsUser,
  findFollowsByFollowerId,
  findFollowsByFollowedId,
} from "../../services/users/follows-service";

const FollowersScreen = () => {
    const [following, setFollowing] = useState([]);
    const { currentUser } = useSelector((state) => state.users);

          const fetchFollowing = async () => {
            const following = await findFollowsByFollowerId(currentUser._id);
            setFollowing(following);
          };
          const loadScreen = async () => {
                  await fetchFollowing();
                };
    const dispatch = useDispatch();
        const navigate = useNavigate();

    useEffect(() => {

               loadScreen();

              }, []);
    return (
        <div>
            <BackButtonComponent/>
            <h1>Followers</h1>
            <ul className="list-group">
                                    {
                                        following.map(user =>
                                            <UserItem
                                                key={user.id} user={user}/> )
                                    }
                        </ul>
        </div>
    )
}

export default FollowersScreen;