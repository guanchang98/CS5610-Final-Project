import mongoose from "mongoose";
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
