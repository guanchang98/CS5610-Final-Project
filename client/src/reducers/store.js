import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users-reducer";
import productsReducer from "./products-reducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  },
});

export default store;
