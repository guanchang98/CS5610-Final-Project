import {
    configureStore
} from "@reduxjs/toolkit";
import usersReducer from "./users-reducer";
import productsReducer from "./products-reducer";
import followsReducer from "./follows-reducer";
const store = configureStore({
    reducer: {
        users: usersReducer,
        products: productsReducer,
        follows: followsReducer,
    },
});
export default store;