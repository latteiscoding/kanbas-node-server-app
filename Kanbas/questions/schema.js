import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
    id: {type:String, required: true, unique: true},
    title: String,
    quiz: String,
    points: Number,
    questionType: {
        type: String,
        enum: ["Multiple Choice", "True/False", "Fill in Blanks"],
        default: "Multiple Choice",
    },
    question: String,
    choices: [String], 
    correctAnswer_multiple: String,
    correctAnswer_trueFalse: {
        type: String,
        enum: ["True", "False"],
        default: "True",
    },
    correctAnswer_fillInBlanks: String,
}, {collection: "questions"});
export default questionSchema;