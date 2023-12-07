import mongoose from "mongoose";

/**
 * @schema
 * Defines the database schema for product list of user(seller own product/buyer like product).
 *
 * @module schemas/product-list
 */
const productsSchema = new mongoose.Schema(
    {
        productId: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
    }, {
        collection: "product-list"
    }
);

export default productsSchema;