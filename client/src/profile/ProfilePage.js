import React from 'react';
import {useParams} from "react-router";

const ProfilePage = (props) => {
    const params = useParams();
    return (
        <div>
            <h1>ProfilePage</h1>
            {props.userID && <span>Welcome, user {props.userID}!</span>}
            {!props.userID && <span>Welcome, user {params.profileId}!</span>}
        </div>

    )
}

export default ProfilePage