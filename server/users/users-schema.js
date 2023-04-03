import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    age: Number,
    followers:[ {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "user",
                  localField: "userId",
                  foreignField: "_id",
                }],
    following:[ {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "user",
                      localField: "userId",
                      foreignField: "_id",
                    }],
    likeProducts:[Number],
    role: { type: String, default: "BUYER", enum: ["SELLER", "BUYER", "ADMIN"] },
  },
  {
    collection: "users",
  }
);
export default usersSchema;
