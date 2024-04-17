import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
    id: {type:String, required: true, unique: true},
    title: String,
    course: String,
    due: Date,
    availableFrom: Date,
    availableUntil: Date,
    published: Boolean,
    quizType: {
        type: String,
        enum: ["Graded Quiz","Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",
    },
    assignmentGroup: {
        type: String,
        enum: ["Quizzes", "Exams", "Assignments", "Projects"],
        default: "Quizzes",
    },
    shuffleAnswers: {type:Boolean, default: true},
    hasTimeLimit: {type: Boolean, default: false},
    timeLimit: {type: Number, default: 20},
    multipleAttempts: {type: Boolean, default: false},
    accessCode: {type: String, default: ""},
    showCorrectAnswers: {type: Boolean, default: false},
    showCorrectAnswersInHours: Number, 
    oneQuestionAtATime: {type: Boolean, default: true},
    webCamRequired: {type: Boolean, default: false},
    lockquestionsAfterAnswered: {type: Boolean, default: false},
    points: Number,
    description: String,
    
    
},
{collection: "quizzes"});
export default quizSchema ;