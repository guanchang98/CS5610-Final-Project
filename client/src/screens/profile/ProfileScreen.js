import React, {
    useEffect,
    useState
} from 'react';
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useNavigate,
    useParams
} from "react-router";
import {
    Link
} from "react-router-dom";
import {
    profileThunk,
    logoutThunk,
    updateUserThunk,
    getCartByUserIdThunk,
    getHistoryByUserIdThunk,
    findUserByIdThunk,
} from "../../services/users/users-thunks";
import {
    findUserById
} from "../../services/users/users-service";
import ProfileMe from "../../components/ProfileMe";
import {
    userUnfollowsUserThunk,
    userFollowsUserThunk,
    findFollowsByFollowedIdThunk,
    findFollowsByFollowerAndFollowedThunk,
    findFollowsByFollowerIdThunk,
} from "../../services/users/follows-thunks";
import {
    userFollowsUser,
    findFollowsByFollowerAndFollowed,
} from "../../services/users/follows-service";
import ProductsList from "../../components/ProductsList";
import BackButtonComponent from "../../components/BackButtonComponent";
import {
    useLocation
} from "react-router";
import bannerPic from "../../images/profile_banner.jpeg";
import avatar from "../../images/avatar_man.png";
import '../../index.css';
import CartAndHistoryItem from "../../components/CartAndHistoryItem";
import {
    findProductByIdThunk
} from "../../services/products/products-thunks";

const ProfileScreen = (props) => {
    const {
        userId
    } = useParams();
    const {
        currentUser
    } = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const [followedFlag, setFlag] = useState("");
    const {
        follows
    } = useSelector((state) => state.follows);
    const [following, setFollows] = useState(follows);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchFollows = async (curUser, paramUser) => {
        if (userId) {
            if (paramUser.role === "SELLER") {
                const response = await dispatch(findFollowsByFollowedIdThunk(userId));
                setFollows(response.payload);
            } else {
                const response = await dispatch(findFollowsByFollowerIdThunk(userId));
                setFollows(response.payload);
            }
        } else {
            if (curUser.role === "SELLER") {
                const response = await dispatch(findFollowsByFollowedIdThunk(curUser._id));
                setFollows(response.payload);
            } else {
                const response = await dispatch(findFollowsByFollowerIdThunk(curUser._id));
                setFollows(response.payload);
            }
        }
    };
    const fetchFollowerAndFollowing = async (curUser) => {
        if (userId && curUser) {
            const response = await dispatch(findFollowsByFollowerAndFollowedThunk({
                follower: curUser._id,
                followed: userId
            }));
            setFlag(response.payload.result);
        }
    }
    const fetchProfile = async () => {
        const response = await dispatch(profileThunk());
        setProfile(response.payload);
        return response;
    };
    const fetchUserInfo = async () => {
        if (userId) {
            const response = await dispatch(findUserByIdThunk(userId));
            setUser(response.payload);
            return response;
        }
    }
    const followUser = async () => {
        try {
            await dispatch(userFollowsUserThunk({
                follower: profile._id,
                followed: userId
            }));
            setFlag("yes");
        } catch (error) {
            console.error(error);
        }
    };
    const unfollowUser = async () => {
        try {
            await dispatch(userUnfollowsUserThunk({
                follower: profile._id,
                followed: userId
            }));
            setFlag("no");
        } catch (error) {
            console.error(error);
        }
    };
    const updateProfile = async () => {
        await dispatch(updateUserThunk(profile));
    };
    const loadScreen = async () => {
        try {
            const profileData = await fetchProfile();
            const paramsUser = await fetchUserInfo();
            if (userId) {
                if (paramsUser.payload) {
                    await fetchFollowerAndFollowing(profileData.payload);
                    await fetchFollows(profileData.payload, paramsUser.payload);
                    await getHistoryItems(paramsUser.payload);
                }
            } else {
                if (profileData.payload) {
                    await fetchFollowerAndFollowing(profileData.payload);
                    await fetchFollows(profileData.payload, null);
                    await getHistoryItems(profileData.payload);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const getItemById = async (id) => {
        const response = await dispatch(findProductByIdThunk(id));
        return response;
    }
    const getHistoryItems = async (curUser) => {
        let historyList = [];
        if (curUser && curUser._id) {
            try {
                const response = await dispatch(getHistoryByUserIdThunk(curUser._id));
                historyList = response.payload;
                let price = 0;
                if (historyList) {
                    const productList = [];
                    for (let i = 0; i < historyList.length; i++) {
                        const response = await getItemById(historyList[i].product_id);
                        price += response.payload.price * historyList[i].count;
                        productList.push({
                            ...response.payload,
                            count: historyList[i].count
                        });
                    }
                    setProducts(productList.reverse());
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
    return user && (!profile || (profile && profile._id !== user._id))?(<div>
               <div className="border-1">
                   <BackButtonComponent />
                   <div className="row">
                       <img src={user?.profilePic} className="w-100 mb-3" height="240" />
                       <div className="col-9 float-start">
                           <img src={user?.avatar} className="w-25 wd-pos-absolute-profile-banner" height="140" />
                       </div> {followedFlag==="no" && profile?.role=="BUYER" && <div className="col-3 mb-4">
                           <button onClick={followUser} className="btn btn-primary rounded-3 float-end"> Follow </button>
                       </div>} {followedFlag==="yes" && profile?.role=="BUYER" && <div className="col-3 mb-4">
                           <button onClick={unfollowUser} className="btn btn-primary rounded-3 float-end"> Unfollow </button>
                       </div>} <br></br> <br></br> <br></br> <br></br>
                       <div>
                           <div className="mt-3">
                               <h2>{user?.username}</h2>
                           </div>
                           <p className="mt-4"> {user?.bio} </p>
                           <div className="row mb-3">
                               <div className="col-3">
                                   <i className="bi bi-geo-alt text-secondary"></i>
                                   <span className="text-secondary"> {user?.location} </span>
                               </div>
                           </div>
                           <div className="row">
                               <div className="mb-3 list-group list-group-horizontal col-3"> { user?.role === "BUYER" && <h2>{follows && follows.length} Following</h2> } { user?.role === "SELLER" && <h2>{follows && follows.length} Followers</h2> } </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>):(profile? <div>
               <div className="border-1">
                   <BackButtonComponent />
                   <div className="row">
                       <img src={profile?.profilePic} className="w-100 mb-3" height="240" />
                       <div className="col-9 float-start">
                           <img src={profile?.avatar} className="w-25 wd-pos-absolute-profile-banner" height="140" />
                       </div> {profile && <div className="col-3 mb-4">
                           <Link className="btn btn-primary rounded-3 float-end" to="/edit-profile"> Edit Profile </Link>
                       </div>} <br></br> <br></br> <br></br> <br></br>
                       <div>
                           <div className="mt-3">
                               <h2>{profile?.username}</h2>
                           </div>
                           <p className="mt-4"> {profile?.bio} </p>
                           <div className="row mb-3">
                               <div className="col-3">
                                   <i className="bi bi-geo-alt text-secondary"></i>
                                   <span className="text-secondary"> {profile?.location}</span>
                               </div> {<div className="col-4">
                                   <i className="bi bi-balloon text-secondary"></i>
                                   <span className="text-secondary"> Born on {profile?.dob} </span>
                               </div>}
                           </div>
                           <div className="row">
                               <div className="mb-3 list-group list-group-horizontal col-3"> { profile?.role === "BUYER" &&
                                   <Link to="/following" className="list-group-item list-group-item-action border-0">
                                   <h2 className="text-secondary">{follows && follows.length} Following</h2>
                                   </Link> } { profile?.role === "SELLER" &&
                                   <Link to="/followers" className="list-group-item list-group-item-action border-0">
                                   <h2 className="text-secondary">{follows && follows.length} Followers</h2>
                                   </Link> }
                               </div>
                           </div>
                       </div>
                   </div>
               </div> {<div>
                   <h2>History</h2>
                   <hr />
                   <ul className="list-group mb-3"> { profile && profile._id && profile.history && products && products.map(p =>
                       <CartAndHistoryItem item={p} /> ) }
                   </ul>
               </div> }
           </div>:
           <Link to='/login'>Please login first</Link>)

}

export default ProfileScreen