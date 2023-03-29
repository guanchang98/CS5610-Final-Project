import React from "react";
import UsersList from "../components/UsersList";
import BackButtonComponent from "../components/BackButtonComponent";

const FollowersPage = () => {
    return (
        <div>
            <BackButtonComponent/>
            <h1>Followers</h1>
            <UsersList/>
        </div>
    )
}

export default FollowersPage;