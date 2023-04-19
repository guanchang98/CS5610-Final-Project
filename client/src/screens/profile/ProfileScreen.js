import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {
    profileThunk,
    logoutThunk,
    updateUserThunk, getCartByUserIdThunk, getHistoryByUserIdThunk,
} from "../../services/users/users-thunks";

//import { findLikesByUserId } from "../../napster/likes-service";
import {findUserById} from "../../services/users/users-service";
import ProfileMe from "../../components/ProfileMe";

import {
    userUnfollowsUserThunk,
    userFollowsUserThunk,
    findFollowsByFollowerIdThunk,
    findFollowsByFollowedIdThunk,
} from "../../services/users/follows-thunks";
import {
    userFollowsUser,
    findFollowsByFollowerAndFollowed,
} from "../../services/users/follows-service";
import ProductsList from "../../components/ProductsList";
import BackButtonComponent from "../../components/BackButtonComponent";
import {useLocation} from "react-router";
import bannerPic from "../../images/profile_banner.jpeg";
import avatar from "../../images/avatar_man.png";
import '../../index.css';
import CartAndHistoryItem from "../../components/CartAndHistoryItem";
import {findProductByIdThunk} from "../../services/products/products-thunks";

const ProfileScreen = (props) => {
    const {userId} = useParams();
    const {currentUser} = useSelector((state) => state.users);
//    console.log("current user at beginning");
//    console.log(currentUser);
    const [profile, setProfile] = useState(currentUser);
    const [followedFlag, setFlag] = useState("");
    const {follows} = useSelector((state) => state.follows);
    const [following, setFollows] = useState(follows);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchFollows = async () => {
        if (profile.role === "SELLER") {
            const response = await dispatch(findFollowsByFollowedIdThunk(currentUser._id));
            setFollows(response.payload);
        } else {
            const response = await dispatch(findFollowsByFollowerIdThunk(profile._id));
            setFollows(response.payload);
        }

    };

    const fetchFollowing = async () => {
        const response = await dispatch(findFollowsByFollowedIdThunk(currentUser._id));
        setFollows(response.payload);
    };
    const fetchProfile = async () => {
        if (userId) {
            console.log("fetchProfile");
            const user = await findUserById(userId);
            setProfile(user);
//            console.log(profile);
//            console.log(currentUser);
            const response = await dispatch(profileThunk());
            const curUser = response.payload;
//            console.log(curUser);
            if (curUser) {
                const followedFlag = await findFollowsByFollowerAndFollowed(curUser._id, userId);
                setFlag(followedFlag.result);
            }
            return;
        }
        const response = await dispatch(profileThunk());
        setProfile(response.payload);
    };


    const followUser = async () => {
        await userFollowsUser(currentUser._id, profile._id);
        setFlag("yes");
    };

    const unfollowUser = async () => {
        await dispatch(userUnfollowsUserThunk({follower: currentUser._id, followed: profile._id}));
        setFlag("no");
    };

    const updateProfile = async () => {
        await dispatch(updateUserThunk(profile));
    };

    const loadScreen = async () => {
        await fetchProfile();
        console.log("flag");
        console.log(followedFlag);
        await fetchFollows();
        await getHistoryItems();
    };

    const getItembyId = async (id) => {
        // console.log("wait to get item by id")
        const response = await dispatch(findProductByIdThunk(id));
        // console.log("item from getItemById function: ", response.payload);
        return response;
    }

    const getHistoryItems = async () => {
        let historyList = [];
        if (currentUser && currentUser._id) {
            try {
                const response = await dispatch(getHistoryByUserIdThunk(currentUser._id));
                historyList = response.payload;
                let price = 0;
                if (historyList) {
                    // console.log("cart length: ", historyList.length);
                    const productList = [];
                    for (let i = 0; i < historyList.length; i++) {
                        const response = await getItembyId(historyList[i].product_id);
                        price += response.payload.price * historyList[i].count;
                        productList.push({...response.payload, count: historyList[i].count});
                    }
                    setProducts(productList);
                }
            } catch (e) {
                console.log("fetching carList error: ", e);
            }
            return [];
        }
    }

    useEffect(() => {
        loadScreen();
    }, [userId]);

    return profile ?
        <div>
            <div className="border-1">
                <BackButtonComponent/>
                <div className="row">
                    <img src={profile?.profilePic} className="w-100 mb-3" height="240"/>
                    <div className="col-9 float-start">
                        <img src={profile?.avatar} className="w-25 wd-pos-absolute-profile-banner"/>
                    </div>
                    {userId && followedFlag === "no" && <div className="col-3 mb-4">
                        <button onClick={followUser} className="btn btn-primary rounded-3 float-end">
                            Follow
                        </button>
                    </div>}
                    {userId && followedFlag === "yes" && <div className="col-3 mb-4">
                        <button onClick={unfollowUser} className="btn btn-primary rounded-3 float-end">
                            Unfollow
                        </button>
                    </div>}

                    {!userId && profile && <div className="col-3 mb-4">
                        <Link className="btn btn-primary rounded-3 float-end" to="/edit-profile">
                            Edit Profile
                        </Link>
                    </div>}
                    <br></br> <br></br> <br></br> <br></br>
                    <div>
                        <div className="mt-3">
                            <h2>{profile?.username}</h2>
                        </div>
                        <p className="mt-4">
                            {profile?.bio}
                        </p>
                        <div className="row mb-3">
                            <div className="col-3">
                                <i className="bi bi-geo-alt text-secondary"></i>
                                <span className="text-secondary"> {profile?.location}   </span>
                            </div>
                            {userId ? <div></div> : <div className="col-4">
                                <i className="bi bi-balloon text-secondary"></i>
                                <span className="text-secondary"> Born on {profile?.dob} </span>
                            </div>}

                        </div>
                        <div className="row">
                            <div className="mb-3 list-group list-group-horizontal col-3">
                                {
                                    profile?.role === "BUYER" && !userId &&
                                    <Link to="/following" className="list-group-item list-group-item-action border-0">
                                        <span className="text-secondary">{following?.length} Following</span>
                                    </Link>
                                }
                                {
                                    profile?.role === "BUYER" && userId &&
                                    <p>{following.length} Following</p>
                                }
                                {
                                    profile?.role === "SELLER" && !userId &&
                                    <Link to="/followers" className="list-group-item list-group-item-action border-0">
                                        <span className="text-secondary">{following?.length} Followers</span>
                                    </Link>
                                }
                                {
                                    profile?.role === "SELLER" && userId &&
                                    <p>{following.length} Followers</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {userId ? <div></div> :
                <div>
                    <h2>History</h2>
                    <ul className="list-group mb-3">
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-8">
                                    <h3>Name</h3>
                                </div>
                                <div className="col-2">
                                    <h3>Price</h3>
                                </div>
                                <div className="col-2">
                                    <h3>Quantity</h3>
                                </div>
                            </div>
                        </li>
                        {
                            currentUser && currentUser._id && currentUser.history && products &&
                            products.map(p =>
                                <CartAndHistoryItem item={p}/>
                            )
                        }
                    </ul>
                </div>
            }

        </div> : <Link to='/login'>Please login first</Link>

}

export default ProfileScreen