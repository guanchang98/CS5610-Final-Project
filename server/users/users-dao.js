import usersModel from "./users-model.js";

/**
 * @dao
 * Provides data access methods for users.
 *
 * @module daos/users-dao
 */
export const findAllUsers = async () => {
    const users = await usersModel.find();
    return users;
};

export const findAllSeller = async () => {
    const users = await usersModel.find({role: "SELLER"});
    return users;
};

export const findAllByRole = async (role) => {
    const users = await usersModel.find({role});
    return users;
};

export const findUserById = async (id) => {
  const user = await usersModel.findById(id);
  return user;
};

export const findUserByUsername = async (username) => {
    const user = await usersModel.findOne({username});
    return user;
};

export const findUserByCredentials = async (username, password) => {
    const user = await usersModel.findOne({username: username, password: password});
    return user;
};

export const deleteUser = async (id) => {
    const status = await usersModel.deleteOne({_id: id});
    return status;
};

export const createUser = async (user) => {
    const newUser = await usersModel.create(user);
    return newUser;
};

export const updateUser = async (id, user) => {
    const status = await usersModel.updateOne({_id: id}, user);
    return status;
};

export const addProductsToUserCart = (userId, productId, count) =>
    usersModel.updateOne({_id: userId}, {$push: {cart: {product_id: productId, count: count}}});


export const getCartByUserId = async (userId) => {
    const status = await usersModel.findOne({_id: userId});
    return status;
}

export const moveCartItemsToHistory = (userId, productId, count) =>
    usersModel.updateOne({_id: userId}, {
        $push: {history: {product_id: productId, count: count}}
    },);

export const deleteCartItems = (userId, productId, count) =>
    usersModel.updateOne({_id: userId}, {
        $pull: {cart: {product_id: productId, count: count}}
    },);

// delete product from cartlist 
export const deleteProductFromCart = (userId, cartListId) =>
    usersModel.updateOne({_id: userId}, {
        $pull: {cart: {_id: cartListId}}
},);







