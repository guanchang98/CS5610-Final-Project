import React from "react";
import {Link} from "react-router-dom";
import UsersList from "../components/UsersList";

const FollowingPage = () => {
    return (
        <div>
            <Link to="../profile">Back</Link>
            <h1>Following</h1>
            <UsersList/>
        </div>
    )
}

export default FollowingPage;