import {profileThunk,updateUserThunk} from "../../services/users/users-thunks";
import {useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useNavigate, useParams } from "react-router";

/**
 * Functional component for user to edit profile.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
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
       //Fetch current user's profile
       loadScreen()  }, []);

   return (
       <div>
          <h2 className="mb-6">Hi, { profile?.username } . Please edit your profile info here !</h2>
          <br></br><br></br>
          <div className="row mb-3"><label>Set bio: </label><textarea contenteditable="true" className="mr-6 ml-4" value={ profile?.bio } onChange={ (e)=> {
             setProfile({
             ...profile, bio: e.target.value
             });
             }
             }
             />
          </div>
          <div className="row mb-3"><label>Set location: </label><input contenteditable="true" className="mr-4 ml-4" value= {
             profile?.location
             }
             onChange= {
             (e)=> {
             setProfile({
             ...profile, location: e.target.value
             });
             }
             }
             />
          </div>
          <div className="row mb-3"><label>Set dob: </label><input contenteditable="true" type="date" className="mr-4 ml-4" value= {
             profile?.dob
             }
             onChange= {
             (e)=> {
             setProfile({
             ...profile, dob: e.target.value
             });
             }
             }
             />
          </div>
          <br></br>
          <div className="d-grid gap-2 col-4 mx-auto">
             <Link className="btn btn-danger" to="/profile">
             Cancel</Link><button className="btn btn-primary" onClick= {
                updateProfile
                }
                >Save</button>
          </div>
       </div>
   );
}


export default EditProfile;
