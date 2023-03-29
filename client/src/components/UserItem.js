import React from "react";
import {Link} from "react-router-dom";

const UserItem = (
    {
        user = {
            "id": "u111111",
            "name": "user1"
        }
    }
) => {
    return (
        <div>
            <Link to={`/profile/${user.id}`} className="btn btn-link">{user.name}</Link>
        </div>
    );
}

export default UserItem;