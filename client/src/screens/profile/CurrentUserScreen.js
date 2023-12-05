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
    profileThunk
} from "../../services/users/users-thunks";
import {
    userFollowsUserThunk,
    findFollowsByFollowerIdThunk,
    findFollowsByFollowedIdThunk,
} from "../../services/users/follows-thunks";


const CurrentUserScreen = (props) => {
    const {follows} = useSelector((state) => state.follows);
    const [following,setFollows] = useState(follows);
    const { currentUser } = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();

    const fetchProfile = async () => {
            const response = await dispatch(profileThunk());
            setProfile(response.payload);
    };

    const fetchFollowers = async () => {
            const response = await dispatch(findFollowsByFollowerIdThunk(profile._id));
            setFollows(response.payload);
    };
    const loadScreen = async () => {
            await fetchProfile();
            await fetchFollowers();
    };

    useEffect(() => {
            loadScreen()  }, []);
    return (
        <div>
           {profile?.username}
        </div>
    );
}

export default CurrentUserScreen