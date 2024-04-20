import model from "./model.js";
export const create = async (question) => {
    delete question._id;
    return model.create(question);
}
export const findQuestionsByQuiz = (quizId) => model.find({quiz: quizId});
export const findQuestionById = (questionId) => model.findOne({id: questionId});
export const updateQuiz = (questionId, question) => model.updateOne({id: questionId}, {$set: question});
export const deleteQuiz = (questionId) => model.deleteOne({id: questionId});