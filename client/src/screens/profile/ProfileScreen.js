import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {Link} from "react-router-dom";
import {
  profileThunk,
  logoutThunk,
  updateUserThunk,
} from "../../services/users/users-thunks";

//import { findLikesByUserId } from "../../napster/likes-service";
import { findUserById } from "../../services/users/users-service";
import ProfileMe from "../../components/ProfileMe";

import {
  userFollowsUser,
  findFollowsByFollowerId,
  findFollowsByFollowedId,
} from "../../services/users/follows-service";
import ProductsList from "../../components/ProductsList";
import BackButtonComponent from "../../components/BackButtonComponent";
import {useLocation} from "react-router";
import bannerPic from "../../images/profile_banner.jpeg";
import avatar from "../../images/avatar_man.png";
import '../../index.css';

const ProfileScreen = (props) => {
    const {userId} = useParams();
    console.log("userId")
    console.log(userId)
    const { currentUser } = useSelector((state) => state.users);
    console.log("current user");
    console.log(currentUser);
    const [profile, setProfile] = useState(currentUser);
    const [following, setFollowing] = useState([]);
    const [follows, setFollows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const fetchProfile = async () => {
        console.log("fetchProfile");
        console.log(userId);
        if (userId) {
            console.log("user");
            const user = await findUserById(userId);
            console.log(user);
            setProfile(user);
            return;
        }
        console.log("usersss");
        const response = await dispatch(profileThunk());
        console.log(response);
        setProfile(response.payload);


    };
    const loadScreen = async () => {
        await fetchProfile();

      };

    const followUser = async () => {
        await userFollowsUser(currentUser._id, profile._id);
    };

    const updateProfile = async () => {
        await dispatch(updateUserThunk(profile));
    };

    const {pathname} = useLocation();
    const paths = pathname.split("/");
    const userProfile = {
            _id : '123',
            bannerPicture: bannerPic,
            bio: "A test user bio",
            dateOfBirth: "1998-10-03",
            userName: "Jane Doe",
            role: "SELLER",
            followCount: 3,
            location: "Sunnyvale",
            profilePicture: avatar,
            website: "google.com",
        }
        const {
            _id,
            bannerPicture,
            userName,
            bio,
            dateOfBirth,
            followCount,
            location,
            profilePicture,
        } = userProfile;

    useEffect(() => {

           loadScreen();

          }, [userId]);

    return currentUser === true?<div>currentUser</div>:
            <div>
                 <div className="border-1">
                     <BackButtonComponent/>
                     <div className="row">
                         <img src={profile?.profilePic} className="w-100 mb-3" height="240"/>
                         <div className="col-9 float-start">
                             <img src={profile?.avatar} className="w-25 wd-pos-absolute-profile-banner"/>
                         </div>
                         {userId?<div className="col-3 mb-4">
                                                              <button onClick={followUser} className="btn btn-primary rounded-3 float-end" >
                                                                                          Follow
                                                              </button>
                                                          </div>:<div className="col-3 mb-4">
                                                                                              <Link className="btn btn-primary rounded-3 float-end" to="/edit-profile">
                                                                                                                          Edit Profile
                                                                                              </Link>
                                                                                          </div>}
                         <br></br>  <br></br> <br></br> <br></br>
                         <div>
                             <div className="mt-3">
                                 <h2>{profile?.username}</h2>
                             </div>
                             <p  className="mt-4" >
                                 {profile?.bio}
                             </p>
                             <div className="row mb-3">
                                 <div className="col-3">
                                     <i className="bi bi-geo-alt text-secondary"></i>
                                     <span className="text-secondary"> {profile?.location}   </span>
                                 </div>
                                 {userId?<div></div>:<div className="col-4">
                                                                              <i className="bi bi-balloon text-secondary"></i>
                                                                              <span  className="text-secondary" > Born on {profile?.dob} </span>
                                                                          </div>}

                             </div>
                             <div className="row">
                                 <div className="mb-3 list-group list-group-horizontal col-3">
                                     {
                                         profile?.role === "BUYER" &&
                                         <Link to="/profile/following" className="list-group-item list-group-item-action border-0">
                                             <span className="text-secondary">Following</span>
                                         </Link>
                                     }
                                     {
                                         profile?.role === "SELLER" &&
                                         <Link to="/profile/followers" className="list-group-item list-group-item-action border-0">
                                             <span className="text-secondary">Followers</span>
                                         </Link>
                                     }
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 {userId?<div></div>: <h3>History</h3>
                 /*{<ProductsList/>}*/
                 }

            </div>
}

export default ProfileScreen