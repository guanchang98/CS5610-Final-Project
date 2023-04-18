import usersModel from "./users-model.js";

export const findAllUsers = async () => {
  const users = await usersModel.find();
  return users;
};

export const findAllSeller = async () => {
  const users = await usersModel.find({ role: "SELLER" });
  return users;
};

export const findAllByRole = async (role) => {
  const users = await usersModel.find({ role });
  return users;
};

export const findUserById = async (id) => {
  const user = await usersModel.findById(id);
  console.log(user)
  return user;
};

export const findUserByUsername = async (username) => {
  const user = await usersModel.findOne({ username });
  return user;
};

export const findUserByCredentials = async (username, password) => {
  const user = await usersModel.findOne({ username: username, password: password });
  return user;
};

export const deleteUser = async (id) => {
  const status = await usersModel.deleteOne({ _id: id });
  return status;
};

export const createUser = async (user) => {
  const newUser = await usersModel.create(user);
  return newUser;
};

export const updateUser = async (id, user) => {
  const status = await usersModel.updateOne({ _id: id }, user);
  return status;
};

export const addProductsToUserCart = (userId, productId, count) => 
  usersModel.updateOne({_id: userId }, { $push: { cart: {product_id: productId, count: count}}}); 




