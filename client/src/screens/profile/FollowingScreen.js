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

const FollowingScreen = (profile) => {
      const [follows, setFollows] = useState([]);
    const { currentUser } = useSelector((state) => state.users);

          const fetchFollowers = async () => {
              const follows = await findFollowsByFollowedId(currentUser._id);
              setFollows(follows);
          };

          const loadScreen = async () => {
                  await fetchFollowers();
                };
      const dispatch = useDispatch();
          const navigate = useNavigate();
      useEffect(() => {

                     loadScreen();

                    }, []);
    return (
        <div>
            <BackButtonComponent/>
            <h1>Following</h1>
            <ul className="list-group">
                        {
                            follows.map(user =>
                                <UserItem
                                    key={user.id} user={user}/> )
                        }
            </ul>
        </div>
    )
}

export default FollowingScreen;