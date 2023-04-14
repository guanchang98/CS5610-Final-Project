import React from "react";
import UserItem from "./UserItem";
import avatar from "../images/avatar_man.png"

const UsersList = () => {
    const itemsArray = [
        {id: "64386a2de84dc2c9d9762652", name: "user1", avatar: avatar, followed: true, bio: "test bio"},
        {id: "6438680d33c2f1ebf78098d2", name: "user2", avatar: avatar, followed: false, bio: "test bio"},
        {id: "6438680d33c2f1ebf78098d2", name: "user3", avatar: avatar, followed: true, bio: "test bio"},
    ];
    return (
        <ul className="list-group">
            {
                itemsArray.map(user =>
                    <UserItem
                        key={user.id} user={user}/> )
            }
        </ul>
    );
}

export default UsersList;