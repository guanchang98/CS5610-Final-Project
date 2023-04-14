import BackButtonComponent from "./BackButtonComponent";
import {Link} from "react-router-dom";

const ProfileMe = (
    {
            user = {
                "id": "u111111",
                "name": "user1",
                "avatar": "../images/avatar_man.png",
                "followed": true,
                "bio": "test bio"
            }
        }
) => {
    return (
    <div className="border-1">
                <BackButtonComponent/>
                <div className="row">
                    <img src={user === null?"":user.profilePic} className="w-100 mb-3" height="240"/>
                    <div className="col-9 float-start">
                        <img src={user === null?"":user.avatar} className="w-25 wd-pos-absolute-profile-banner"/>
                    </div>
                    <div className="col-3 mb-4">
                        <Link className="btn btn-primary rounded-3 float-end" to="../edit-profile">
                            Edit Profile
                        </Link>
                    </div>
                    <div>
                        <div className="mt-3">
                            <h2>{user.username}</h2>
                        </div>
                        <p className="mt-4">
                            {user.bio}
                        </p>
                        <div className="row mb-3">
                            <div className="col-3">
                                <i className="bi bi-geo-alt text-secondary"></i>
                                <span className="text-secondary"> {user.location} </span>
                            </div>
                            <div className="col-4">
                                <i className="bi bi-balloon text-secondary"></i>
                                <span className="text-secondary"> Born on {user.dob} </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 list-group list-group-horizontal col-3">
                                {
                                    user.role === "BUYER" &&
                                    <Link to="/profile/following" className="list-group-item list-group-item-action border-0">
                                        <span className="text-secondary">Following</span>
                                    </Link>
                                }
                                {
                                    user.role === "SELLER" &&
                                    <Link to="/profile/followers" className="list-group-item list-group-item-action border-0">
                                        <span className="text-secondary">Followers</span>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );

}

export default ProfileMe;