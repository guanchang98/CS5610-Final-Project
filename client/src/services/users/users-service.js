import axios from "axios";
 const API_BASE = process.env.REACT_APP_API_BASE;
 const USERS_API_URL = `${API_BASE}/users`;
//const USERS_API_URL = "http://localhost:4000/api/users";
console.log(USERS_API_URL)

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

//export const loginUser = async (user) => {
//  const response = await axios.post(`${API_BASE}/api/login`, user);
//  return response.data;
//};

export const logout = () => {
  return api.post(`${USERS_API_URL}/logout`);
};

export const register = (user) => {
  return api.post(`${USERS_API_URL}/register`, user);
};

export const profile =  () => {
//  const response = await api.get(`${USERS_API_URL}/profile`);
//  return response;
    return api.get(`${USERS_API_URL}/profile`);
};

export const addProductsToUserCart = (userId, productId, count) => {
  console.log("product id from server: ", "product id: ", productId, "user id: ", userId, "count: ", count)
  const response = api.put(`${USERS_API_URL}/${userId}/cart/${productId}/count/${count}`);
  return response.data;
}
