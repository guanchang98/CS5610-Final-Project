import React from 'react';
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import ProductsList from "../../components/ProductsList";
import BackButtonComponent from "../../components/BackButtonComponent";
import {useLocation} from "react-router";
import bannerPic from "../../images/profile_banner.jpeg";
import avatar from "../../images/avatar_man.png";
import '../../index.css';

const ProfileScreen = (props) => {
    const params = useParams();
    const {pathname} = useLocation();
    const paths = pathname.split("/");
    const userProfile = {
        bannerPicture: bannerPic,
        bio: "A test user",
        dateJoined: "2023-04-05",
        dateOfBirth: "1998-10-03",
        firstName: "Chang",
        lastName: "Guan",
        followersCount: 3,
        followingCount: 3,
        handle: "@changguan",
        location: "Sunnyvale",
        profilePicture: avatar,
        website: "google.com",
    }
    const {
        bannerPicture,
        bio,
        dateJoined,
        dateOfBirth,
        firstName,
        followersCount,
        followingCount,
        handle,
        lastName,
        location,
        profilePicture,
    } = userProfile;
    return (
        <div className="border-1">
            {paths.length > 2 && <BackButtonComponent/>}
            {paths.length <= 2 && <BackButtonComponent/>}
            {/*{props.userID && <span>Welcome, user {props.userID}!</span>}*/}
            {/*{!props.userID && <span>user {params.profileId}'s profile</span>}*/}

            <div className="row">
                <img src={bannerPicture} className="w-100 mb-3" height="240"/>
                <div className="col-9 float-start">
                    <img src={profilePicture} className="w-25 wd-pos-absolute-profile-banner"/>
                </div>
                <div className="col-3 mb-4">
                    <Link className="btn btn-primary rounded-3 float-end" to="../edit-profile">
                        Edit Profile
                    </Link>
                </div>
                <div>
                    <div className="mt-3">
                        <h2>{firstName} {lastName}</h2>
                    </div>
                    <div className="mb-3 text-secondary">
                        {handle}
                    </div>
                    <p>
                        {bio}
                    </p>
                    <div className="row mb-3">
                        <div className="col-3">
                            <i className="bi bi-geo-alt text-secondary"></i>
                            <span className="text-secondary"> {location} </span>
                        </div>
                        <div className="col-4">
                            <i className="bi bi-balloon text-secondary"></i>
                            <span className="text-secondary"> Born on {dateOfBirth} </span>
                        </div>
                        <div className="col-4">
                            <i className="bi bi-calendar3 text-secondary"></i>
                            <span className="text-secondary"> Joined {dateJoined} </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 list-group list-group-horizontal col-5">
                            <Link to="/profile/following" className="list-group-item list-group-item-action border-0">
                                <b>{followingCount} </b>
                                <span className="text-secondary">Following</span>
                            </Link>
                            <Link to="/profile/followers" className="list-group-item list-group-item-action border-0">
                                <b> {followersCount} </b>
                                <span className="text-secondary">Followers</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3>History</h3>
                    </div>
                </div>
            </div>
            <ProductsList/>
        </div>

    )
}

export default ProfileScreen