import {createSlice} from "@reduxjs/toolkit";
import {
    findProductsThunk,
    createProductThunk,
    deleteProductByIdThunk,
    findProductByIdThunk,
    updateProductByIdThunk,
    findProductByObjectIdThunk,
} from "../services/products/products-thunks";

const initialState = {
    products: [],
    loading: false
};

const productSlice = createSlice({
        name: "products",
        initialState: initialState,
        reducers: {},
        extraReducers: {
            [findProductsThunk.pending]: (state, action) => {
                state.loading = true;
                state.products = [];
            },
            [findProductsThunk.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            },
            [findProductsThunk.fulfilled]: (state, action) => {
                state.loading = false;
                state.products = action.payload;
            },
            [findProductByIdThunk.pending]: (state, action) => {
                state.loading = true;
                state.products = [];
            },
            [findProductByIdThunk.fulfilled]: (state, action) => {
                state.loading = false;
                state.products = action.payload;
            },
            [findProductByObjectIdThunk.fulfilled]: (state, action) => {
                state.loading = false;
                state.products = action.payload;
            },
            [findProductByObjectIdThunk.pending]: (state, action) => {
                state.loading = true;
                state.products = [];
            },
            [createProductThunk.fulfilled]: (state, {payload}) => {
                state.loading = false;
                state.products = {...state.products, payload};
            },
            [createProductThunk.pending]: (state, action) => {
                state.loading = true;
                state.products = [];
            },
            [createProductThunk.rejected]: (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            },
            [deleteProductByIdThunk.fulfilled]: (state, {payload}) => {
                state.loading = false;
                console.log("delete prod reducer -- payload", state.products)
                state.products = state.products.filter(p => p._id !== payload);
            },
            [updateProductByIdThunk.fulfilled]: (state, {payload}) => {
                state.loading = false;
                const productIdx = state.products.findIndex(p => p.product_id === payload.product_id)
                state.products[productIdx] = {
                    ...state.products[productIdx],
                    ...payload
                }
            },
        }
    }
)

export default productSlice.reducer;