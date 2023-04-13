import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./products-service";

export const createProductThunk = createAsyncThunk(
    "products/createProduct", async (product) => {
        const newProduct = new service.createProduct(product);
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

export const updateProductByIdThunk = createAsyncThunk(
    "products/updateProductById", async (pid, product) =>
        await service.updateProductById(pid, product)
)