import React from 'react';
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import ProductsList from "../components/ProductsList";
import BackButtonComponent from "../components/BackButtonComponent";
import {useLocation} from "react-router";

const ProfilePage = (props) => {
    const params = useParams();
    const {pathname} = useLocation();
    const paths = pathname.split("/");
    return (
        <div>
            {paths.length > 2 && <BackButtonComponent/>}
            <h1>ProfilePage</h1>
            {props.userID && <span>Welcome, user {props.userID}!</span>}
            {!props.userID && <span>user {params.profileId}'s profile</span>}
            <ProductsList/>
            <div className="container">
                <div className="list-group list-group-horizontal mb-3">
                    <Link
                        to="/profile/following"
                        className={`list-group-item`}
                    >
                        3 Following
                    </Link>
                    <Link
                        to="/profile/followers"
                        className={`list-group-item`}
                    >
                        3 Followers
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default ProfilePage