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
//import {
//  userFollowsUser,
//  findFollowsByFollowerId,
//  findFollowsByFollowedId,
//} from "../services/follows-service";
import ProfileMe from "../../components/ProfileMe";
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
    const {loading} = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchProfile = async () => {
        if (typeof userId !== "undefined") {
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
    const updateProfile = async () => {
        await dispatch(updateUserThunk(profile));
    };

    const {pathname} = useLocation();
    const paths = pathname.split("/");
    const userProfile = {
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
            bannerPicture,
            userName,
            bio,
            dateOfBirth,
            followCount,
            location,
            profilePicture,
        } = userProfile;

    useEffect(() => {
           console.log("usereffect");
           loadScreen();
           console.log("profile");
           console.log(profile)
          }, [userId]);
    return loading === true?<div>loading</div>:
        <div>
             <ProfileMe key={profile._id} user={profile}/>
             <h3>History</h3>
             <ProductsList/>
        </div>
}

export default ProfileScreen