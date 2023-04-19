import { findProductById } from "../services/products/products-service";

const { createSlice } = require("@reduxjs/toolkit");
const {
  findAllUsersThunk,
  findUserByIdThunk,
  createUserThunk,
  deleteUserThunk,
  updateUserThunk,
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk,
  addProductsToUserCartThunk
} = require("../services/users/users-thunks");

const { findProductByIdThunk } = require( "../services/products/products-thunks");

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentUser: null,
  productList: []
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [updateUserThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
//      state.users = state.users.map((user) =>
//        user.id === action.payload.id ? action.payload : user
//      );
    },
    [createUserThunk.fulfilled]: (state, action) => {
      state.users.push(action.payload);
    },
    [deleteUserThunk.fulfilled]: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    [findAllUsersThunk.pending]: (state, action) => {
      state.loading = true;
      state.users = [];
    },
    [findAllUsersThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [findAllUsersThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
//    [findUserByIdThunk.pending]: (state, action) => {
//      state.loading = true;
//    },
//    [findUserByIdThunk.fulfilled]: (state, action) => {
//      state.loading = false;
//      state.currentUser = action.payload;
//    },
    [loginThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.currentUser = null;
    },
    [profileThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [addProductsToUserCartThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    }, 

    [findProductByIdThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.productList = action.payload;
    }
  },
});

export default usersSlice.reducer;
