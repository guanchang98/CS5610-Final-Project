import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API_URL = `${API_BASE}/users`;


const api = axios.create({
  withCredentials: true,
});

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API_URL);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await axios.get(`${USERS_API_URL}/userId/${id}`);
  return response.data;
};

export const createUser = (user) => {
  return axios.post(USERS_API_URL, user);
};

export const updateUser = (newUser) => {
  return api.put(`${USERS_API_URL}/${newUser._id}`, newUser);
};

export const deleteUser = (id) => {
  return axios.delete(`${USERS_API_URL}/${id}`);
};

export const login = (user) => {
  return api.post(`${USERS_API_URL}/login`, user);
};


export const logout = () => {
  return api.post(`${USERS_API_URL}/logout`);
};

export const register = (user) => {
  return api.post(`${USERS_API_URL}/register`, user);
};

export const profile =  () => {
    return api.get(`${USERS_API_URL}/profile`);
};

export const addProductsToUserCart = (userId, productId, count) => {
  const response = api.put(`${USERS_API_URL}/${userId}/cart/${productId}/count/${count}`);
  return response.data;
}

export const getCartByUserId = async (userId) => {
  const response = await axios.get(`${USERS_API_URL}/${userId}/cart`);
  return response;
}

export const getHistoryByUserId = async (userId) => {
  const response = await axios.get(`${USERS_API_URL}/${userId}/history`);
  return response;
}

export const moveCartItemsToHistory = (userId, productId, count) => {
  const response = api.put(`${USERS_API_URL}/${userId}/history/${productId}/count/${count}`);
  return response;
}

export const deleteProductFromCart = (userId, clId) => {
  const response = api.delete(`${USERS_API_URL}/${userId}/deletle/cart/item/${clId}`);
  return response;
}