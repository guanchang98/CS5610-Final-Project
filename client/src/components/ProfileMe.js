import BackButtonComponent from "./BackButtonComponent";
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
//import updateUserThunk from "../services/users/users-thunk";
const ProfileMe = (
    {
            profile
        }
) => {
    const defaultuser = {
                    avatar: "../images/avatar_man.png",
                    bio: "A test user bio",
                    dob: "1998-10-03",
                    username: "Jane Doe",
                    role: "SELLER",
                    location: "Sunnyvale",
                    profilePic: "../images/profile_banner.png",
                }

    return (
    <div className="border-1">
                <BackButtonComponent/>
                <div className="row">
                    <img src={profile?.profilePic} className="w-100 mb-3" height="240"/>
                    <div className="col-9 float-start">
                        <img src={profile?.avatar} className="w-25 wd-pos-absolute-profile-banner"/>
                    </div>
                    <div className="col-3 mb-4">
                        <Link className="btn btn-primary rounded-3 float-end" to="../edit-profile">
                            Update Profile
                        </Link>
                    </div>
                    <div>
                        <div className="mt-3">
                            <h2>{profile?.username}</h2>
                        </div>
                        <p contenteditable="true" className="mt-4">
                            {profile?.bio}
                        </p>
                        <div className="row mb-3">
                            <div className="col-3">
                                <i className="bi bi-geo-alt text-secondary"></i>
                                <span contenteditable="true" className="text-secondary"> {profile?.location} </span>
                            </div>
                            <div className="col-4">
                                <i className="bi bi-balloon text-secondary"></i>
                                <span contenteditable="true" className="text-secondary"> Born on {profile?.dob} </span>
                            </div>
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
    );

}

export default ProfileMe;