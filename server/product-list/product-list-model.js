import productsSchema from "./product-list-schema.js";
import mongoose from "mongoose";

const productListModel = mongoose.model("product-list", productsSchema);

export default productListModel;