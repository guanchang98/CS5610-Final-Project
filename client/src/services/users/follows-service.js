import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API_URL = `${API_BASE}/users`;
// const USERS_API_URL = "http://localhost:4000/api/users";
// console.log(USERS_API_URL)

const api = axios.create({
  withCredentials: true,
});


export const userFollowsUser = async (follower, followed) => {
  const response = await axios.post(
    `${USERS_API_URL}/${follower}/follows/${followed}`
  );
  return response.data;
};

export const userUnfollowsUser = async (follower, followed) => {
  const response = await axios.delete(
    `${USERS_API_URL}/${follower}/follows/${followed}`
  );
  return response.data;
};

export const findFollowsByFollowerAndFollowed = async (follower, followed) => {
    const response = await axios.get(`${USERS_API_URL}/${follower}/follows/${followed}`);
    return response.data;
}

export const findFollowsByFollowedId = async (followed) => {
  const response = await axios.get(`${USERS_API_URL}/${followed}/followers`);
  return response.data;
};

export const findFollowsByFollowerId = async (follower) => {
  const response = await axios.get(`${USERS_API_URL}/${follower}/followees`);
  return response.data;
};

export const getCartByUserId = async (userId) => {
  const response = await axios.get(`${USERS_API_URL}/${userId}/cart`);
  return response.data;
}