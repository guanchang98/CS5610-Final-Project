import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email:String,
    dob:Date,
    location:String,
    bio:String,
    role: { type: String, default: "BUYER", enum: ["SELLER", "BUYER", "ADMIN"] },
    avatar:{type: String, default:},
    profilePic:{type: String, default:},
    cart: [
        {
          type: {
            product_id: {
              type: Number,
              ref: "Product",
              required: true,
              localField: "product_id",
              foreignField: "product_id",
              justOne: true,
            },
            count: {
              type: Number,
              required: true,
            },
          },
          required: false,
        },
    ],
    history: [
        {
          type: {
            product_id: {
              type: Number,
              ref: "Product",
              required: true,
              localField: "product_id",
              foreignField: "product_id",
              justOne: true,
            },
            count: {
              type: Number,
              required: true,
            },
          },
          required: false,
        },
    ],
  },
  {
    collection: "users",
  }
);
export default usersSchema;
