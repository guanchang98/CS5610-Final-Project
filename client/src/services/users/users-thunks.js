import * as userService from "./users-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const findAllUsersThunk = createAsyncThunk("users/findAll", async () => {
  const users = await userService.findAllUsers();
  return users;
});

export const findUserByIdThunk = createAsyncThunk(
  "users/findById",
  async (id) => {
    const response = await userService.findUserById(id);
    return response.data;
  }
);

export const createUserThunk = createAsyncThunk(
  "users/create",
  async (user) => {
    const response = await userService.createUser(user);
    return response.data;
  }
);

//update user profile:only update current user
export const updateUserThunk = createAsyncThunk(
  "users/update",
  async (user) => {
    await userService.updateUser(user);
    return user;
  }
);

export const deleteUserThunk = createAsyncThunk("users/delete", async (id) => {
  await userService.deleteUser(id);
  return id;
});

export const loginThunk = createAsyncThunk("users/login", async (user) => {
  const response = await userService.login(user);
  return response.data;
});

export const logoutThunk = createAsyncThunk("users/logout", async () => {
  await userService.logout();
});

export const registerThunk = createAsyncThunk(
  "users/register",
  async (user) => {
    const response = await userService.register(user);
    return response.data;
  }
);

export const profileThunk = createAsyncThunk("users/profile", async () => {
  const response = await userService.profile();
  return response.data;
});

export const addProductsToUserCartThunk = createAsyncThunk(
  "users/addProductsToUserCart",    
  async (userId, productId, count) => {
    console.log("product id from server: ", "product id: ", productId, "user id: ", userId, "count: ", count)
    const response = await userService.addProductsToUserCart(userId, productId, count);
    return response.data;
  } 
);

export const getCartByUserIdThunk = createAsyncThunk(
  "users/getCartByUserId",
  async (userId) => {
    const response = await userService.getCartByUserId(userId);
    return response.data;
  }
);

export const getHistoryByUserIdThunk = createAsyncThunk(
    "users/getHistoryByUserId",
    async (userId) => {
        const response = await userService.getHistoryByUserId(userId);
        return response.data;
    }
);

