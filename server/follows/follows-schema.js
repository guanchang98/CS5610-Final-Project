import mongoose from "mongoose";
const followsSchema = new mongoose.Schema(
  {
    follower:{type:mongoose.Schema.Types.ObjectId, ref:"users",required:true},
    followed:{type:mongoose.Schema.Types.ObjectId, ref:"users",required:true},
//      follower:String,
//      followed:String,
  },
  {
      collection: "follows",
  }
);
export default followsSchema;
