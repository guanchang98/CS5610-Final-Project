import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./product-list-service";


export const userLikesProductThunk = createAsyncThunk(
    "products/userLikesProduct",
    async (userId, productId) => {
        const response = await service.userLikesProduct(userId, productId);
        return response.data;
    }
);

export const userUnlikesProductThunk = createAsyncThunk(
    "products/userUnlikesProduct",
    async (userId, productId) => {
        const response = await service.userUnlikesProduct(userId, productId);
        return response.data;
    }
);

export const findLikeStatusByProductIdAndUserIdThunk = createAsyncThunk(
    "products/likeStatus",
    async (userId, productId) => {
        const response = await service.findLikeStatusByProductIdAndUserId(userId, productId);
        return response.data;
    }
)