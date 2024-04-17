import model from "./model.js";
export const createQuiz = (quiz) => {
    delete quiz._id; // remove _id field just in case client sends it
    return model.create(quiz);
}
export const findAllQuizzes = () => model.find();
export const findQuizById = (quizId) => model.findOne({id: quizId});
export const findQuizzesByCourse = (courseId) => model.find({course: courseId});
export const updateQuiz = (quizId, quiz) => model.updateOne({id: quizId}, {$set: quiz});
export const deleteQuiz = (quizId) => model.deleteOne({id: quizId});