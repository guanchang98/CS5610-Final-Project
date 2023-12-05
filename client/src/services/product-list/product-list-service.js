import axios from "axios";


const API_BASE = process.env.REACT_APP_API_BASE;
const PRODUCT_LIST_API = `${API_BASE}/product-list`;

export const userLikesProduct = async (userId, productId) => {
  const response = await axios.post(`${PRODUCT_LIST_API}/${userId}/likes/${productId}`);
  return response.data;     // like object  
}

export const userUnlikesProduct = async (userId, productId) => {
    const response = await axios.delete(`${PRODUCT_LIST_API}/${userId}/unlikes/${productId}`);
    return response.data;     // status object
}

export const findLikeStatusByProductIdAndUserId = async (userId, productId) => {
    const response = await axios.get(`${PRODUCT_LIST_API}/${userId}/${productId}/likeStatus`);
    return response.data;
}

export const findLikeProductListById = async (userId) => {
    const response = await axios.get(`${PRODUCT_LIST_API}/${userId}`);
    return response.data;
}
