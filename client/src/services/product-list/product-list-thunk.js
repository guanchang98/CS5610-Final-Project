import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./product-list-service";


export const userLikesProductThunk = createAsyncThunk(
    "products/userLikesProduct",
    async (userId, productId) => {
        const response = await service.userLikesProduct(userId, productId);
        return response.data;
    }
);