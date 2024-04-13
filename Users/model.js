// mongoose model provides low level generic functions
// find, create, updateOne, and deleteOne
import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("UserModel", schema);
export default model;