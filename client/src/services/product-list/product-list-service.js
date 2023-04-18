import axios from "axios";

// const LIKES_API = "http://localhost:4000/api/likes";
const USERS_API = "http://localhost:4000/api/users";

export const userLikesProduct = async (userId, productId) => {
  const response = await axios.post(`${USERS_API}/${userId}/likes/${productId}`);
  return response.data;     // like object  
}

export const userUnlikesProduct = async (userId, productId) => {
    const response = await axios.delete(`${USERS_API}/${userId}/unlikes/${productId}`);
    return response.data;     // status object
}

