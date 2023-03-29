import React from "react";
import {Link} from "react-router-dom";
import UsersList from "../components/UsersList";

const FollowersPage = () => {
    return (
        <div>
            <Link to="../profile">Back</Link>
            <h1>Followers</h1>
            <UsersList/>
        </div>
    )
}

export default FollowersPage;