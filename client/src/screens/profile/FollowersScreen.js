import React, {
    useEffect,
    useState
} from 'react';
import UserItem from "../../components/UserItem";
import BackButtonComponent from "../../components/BackButtonComponent";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    useNavigate,
    useParams
} from "react-router";
import {
    userFollowsUserThunk,
    findFollowsByFollowerIdThunk,
    findFollowsByFollowedIdThunk,
} from "../../services/users/follows-thunks";
import {
    profileThunk,
    logoutThunk,
    updateUserThunk,
} from "../../services/users/users-thunks";

const FollowersScreen = () => {
    const {follows} = useSelector((state) => state.follows);
    const [followers,setFollowing] = useState(follows);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const fetchProfile = async () => {
        const response = await dispatch(profileThunk());
        setProfile(response.payload);
        return response;
    };
    const fetchFollowing = async (id) => {
        const response = await dispatch(findFollowsByFollowedIdThunk(id));
        setFollowing(response.payload);
    };

    const loadScreen = async () => {
          try{
                const profileData = await fetchProfile();
                if (profileData.payload){
                   await fetchFollowing(profileData.payload._id);
                }
          } catch (error) {
                console.error(error);
          }

    };

    useEffect(() => {
        loadScreen();
    }, []);

    return (
        <div>
            <BackButtonComponent />
            <h1>Followers</h1>
            <ul className="list-group"> { follows?.map(user =>
                <UserItem key={user?.id} user={user} /> ) }
            </ul>
        </div>
    )
}

export default FollowersScreen;