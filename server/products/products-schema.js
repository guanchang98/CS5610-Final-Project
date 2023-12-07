import mongoose from "mongoose";

/**
 * @schema
 * Defines the database schema for products.
 *
 * @module schemas/products
 */
const productsSchema = new mongoose.Schema(
    {
        product_id: {type: Number, unique: true, required: true},
        name: String,
        first_brewed: String,
        description: String,
        image_url: String,
        price: {type: Number, default: 9.99},
        seller_id: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
    }, {
        collection: "products"
    }
);

export default productsSchema;