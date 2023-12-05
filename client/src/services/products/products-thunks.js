import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./products-service";

export const createProductThunk = createAsyncThunk(
    "products/createProduct", async (product) => {
        const newProduct = await service.createProduct(product);
        return newProduct;
    }
)

export const deleteProductByIdThunk = createAsyncThunk(
    "products/deleteProductById", async (pid) => {
        await service.deleteProductById(pid);
        return pid;
    }
)

export const findProductsThunk = createAsyncThunk(
    "products/findProducts", async () => {
        const products = service.findProducts();
        return products;
    }
)

export const findProductByIdThunk = createAsyncThunk(
    "products/findProductById", async (pid) => {
        const product = service.findProductById(pid);
        return product;
    }
)

export const findProductByObjectIdThunk = createAsyncThunk(
    "products/findProductByObjectId", async (id) => {
        const product = service.findProductByObjectId(id);
        return product;
    }
)

export const updateProductByIdThunk = createAsyncThunk(
    "products/updateProductById", async (product) =>
        await service.updateProductById(product)
)