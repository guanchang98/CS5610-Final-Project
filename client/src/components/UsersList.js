import React from "react";
import UserItem from "./UserItem";
import avatar from "../images/avatar_man.png"

const UsersList = () => {
    const itemsArray = [
        {id: "u111111", name: "user1", avatar: avatar, followed: true, bio: "test bio"},
        {id: "u222222", name: "user2", avatar: avatar, followed: false, bio: "test bio"},
        {id: "u333333", name: "user3", avatar: avatar, followed: true, bio: "test bio"},
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