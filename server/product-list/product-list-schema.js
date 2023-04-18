import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
    {
        productId: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
    }, {
        collection: "product-list"
    }
);

export default productsSchema;