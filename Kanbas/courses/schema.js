import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    id: {type:String, required: true, unique: true},
    name: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    department: String,
    credits: Number,
    image: String,
},
{collection: "courses"});
export default courseSchema;