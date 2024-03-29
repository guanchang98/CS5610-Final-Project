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
    useNavigate
} from "react-router";
import {
    findFollowsByFollowerIdThunk
} from "../../services/users/follows-thunks";
import {
    profileThunk
} from "../../services/users/users-thunks";


/**
 * Functional component representing user's following users.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const FollowingScreen = () => {
    const {follows} = useSelector((state) => state.follows);
    const [following,setFollows] = useState(follows);
    const  {currentUser}  = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const fetchProfile = async () => {
        const response = await dispatch(profileThunk());
        setProfile(response.payload);
        return response;
    };

    const fetchFollowers = async (id) => {
        const response = await dispatch(findFollowsByFollowerIdThunk(id));
        setFollows(response.payload);
    };

    const loadScreen = async () => {
          try{
              const profileData = await fetchProfile();
              if (profileData){
                await fetchFollowers(profileData.payload._id);
              }
          } catch (error) {
              console.error(error);
          }
    };

    useEffect(() => {
        //fetch current user's id and followings
       loadScreen();
    }, []);

    return (
        <div>
            <BackButtonComponent />
            <h1>Following</h1>
            <h1>{currentUser?.username}</h1>
            <ul className="list-group"> { follows?.map(user =>
                <UserItem key={user._id} user={user} /> ) }
            </ul>
        </div>
    )
}

export default FollowingScreen;