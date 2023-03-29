import React from "react";
import UserItem from "./UserItem";

const UsersList = () => {
    const itemsArray = [
        {id: "u111111", name: "user1"},
        {id: "u222222", name: "user2"},
        {id: "u333333", name: "user3"},
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