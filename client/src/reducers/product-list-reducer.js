import {createSlice} from "@reduxjs/toolkit";

import {
    findLikeStatusByProductIdAndUserIdThunk,
    userLikesProductThunk,
    userUnlikesProductThunk
} from "../services/product-list/product-list-thunk";

const initialState = {
    productList: [],
};


const productListSlice = createSlice({
    name: "productList",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [findLikeStatusByProductIdAndUserIdThunk.fulfilled]: (state, action) => {
            console.log("findLikeStatusThunk", state, action.payload);
        },
        [findLikeStatusByProductIdAndUserIdThunk.rejected]: (state, action) => {
            console.log("findLikeStatusThunk", action.error);
        },
    }
})