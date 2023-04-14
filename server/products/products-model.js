import productsSchema from "./products-schema.js";
import mongoose from "mongoose";

const productsModel = mongoose.model("products", productsSchema);

export default productsModel;