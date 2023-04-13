import mongoose from "mongoose";

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