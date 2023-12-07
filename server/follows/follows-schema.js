import mongoose from "mongoose";

/**
 * @schema
 * Defines the database schema for follow relationship between users.
 *
 * @module schemas/follows
 */
const followsSchema = new mongoose.Schema(
  {
    follower:{type:mongoose.Schema.Types.ObjectId, ref:"users",required:true},
    followed:{type:mongoose.Schema.Types.ObjectId, ref:"users",required:true},
  },
  {
      collection: "follows",
  }
);
export default followsSchema;
