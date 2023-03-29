import React from 'react';
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const ProfilePage = (props) => {
    const params = useParams();
    const active = params[1];
    return (
        <div>
            <h1>ProfilePage</h1>
            {props.userID && <span>Welcome, user {props.userID}!</span>}
            {!props.userID && <span>user {params.profileId}'s profile</span>}
            <div className="container">
                <div className="list-group list-group-horizontal mb-3">
                    <Link
                        to="/profile/following"
                        className={`list-group-item ${active === "following" ? "active" : ""}`}
                    >
                        0 Following
                    </Link>
                    <Link
                        to="/profile/followers"
                        className={`list-group-item ${active === "followers" ? "active" : ""}-6`}
                    >
                        0 Followers
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default ProfilePage