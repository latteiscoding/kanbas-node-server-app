import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema({
    id: {type:String, required: true, unique: true},
    name: String,
    description: String,
    course: String,
    lessons: Array,
},
{collection: "modules"});
export default moduleSchema;