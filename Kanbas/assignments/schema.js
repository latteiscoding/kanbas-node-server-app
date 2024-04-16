import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
    id: {type:String, required: true, unique: true},
    title:  String,
    course: { type: String, required: true },
},
{collection: "assignments"});
export default assignmentSchema;