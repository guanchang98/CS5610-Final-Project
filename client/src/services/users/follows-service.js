import axios from "axios";

const USERS_API = "http://localhost:4000/api/users";

const api = axios.create({
  withCredentials: true,
});

export const userFollowsUser = async (follower, followed) => {
  const response = await axios.post(
    `${USERS_API}/${follower}/follows/${followed}`
  );
  console.log("userfollowuser");
  console.log(response);
  return response.data;
};

export const userUnfollowsUser = async (follower, followed) => {
  const response = await axios.delete(
    `${USERS_API}/${follower}/follows/${followed}`
  );
  return response.data;
};

export const findFollowsByFollowerAndFollowed = async (follower, followed) => {
    const response = await axios.get(`${USERS_API}/${follower}/follows/${followed}`);
    console.log("find by er and ed");
    console.log(follower);
    console.log(followed);
    console.log(response);
    return response.data;
}

export const findFollowsByFollowedId = async (followed) => {
  const response = await axios.get(`${USERS_API}/${followed}/followers`);
  return response.data;
};

export const findFollowsByFollowerId = async (follower) => {
  const response = await axios.get(`${USERS_API}/${follower}/followees`);
  console.log("find follows by follower id");
  console.log(response);
  return response.data;
};