import {profileThunk,
  updateUserThunk,
} from "../../services/users/users-thunks";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useNavigate, useParams } from "react-router";


const EditProfile = () => {
   const { currentUser } = useSelector((state) => state.users);
   const [profile, setProfile] = useState(currentUser);
   const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateProfile = async () => {
            await dispatch(updateUserThunk(profile));
            navigate("/profile");
        };
    const fetchProfile = async () => {

            const response = await dispatch(profileThunk());
            setProfile(response.payload);


        };
    const loadScreen = async () => {
            await fetchProfile();
          };

    useEffect(() => {
            loadScreen()  }, []);
   return (
   <div>
                                <h2 className="mb-6">Hi, {profile?.username}. Please edit your profile info here!</h2>
                                <br></br><br></br>
                                <div className="row mb-3">
                                     <label> Set bio: </label>

                                    <textarea contenteditable="true" className="mr-6 ml-4" value = {profile?.bio} onChange={(e) => {
                                                                                           setProfile({ ...profile, bio: e.target.value });
                                                                                         }}/>
                                </div>
                                <div className="row mb-3">
                                    <label> Set location: </label>
                                    <input contenteditable="true" className="mr-4 ml-4" value = {profile?.location} onChange={(e) => {setProfile({ ...profile, location: e.target.value });                                                                                                            }} />
                                </div>
                                <div className="row mb-3">
                                    <label> Set dob: </label>
                                    <input contenteditable="true" className="mr-4 ml-4"  value = {profile?.dob} onChange={(e) => {
                                                                                                            setProfile({ ...profile, dob: e.target.value });
                                                                                                          }}  />
                                </div>
                                <br></br>
                                <div className="row">

                                    <div className="col-5 ml-3">

                                        <Link className="btn btn-primary rounded-3" to="/profile"> Cancel
                                                                        </Link>
                                    </div>
                                    <div className="col-4">
                                    <button className="btn btn-primary rounded-3" onClick = {updateProfile}>
                                                                                             Save
                                    </button>
                                    </div>
                                </div>
   </div>
   );
}


export default EditProfile;
