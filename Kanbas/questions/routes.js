import { get } from "mongoose";
import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
    const getQuestionsByQuiz = async (req, res) => {
        const quizId = req.params;
        const questions = await dao.findQuestionsByQuiz(quizId);
        res.json(questions);
    }

    const getQuestionById = async (req, res) => {
        const questionId = req.params;
        const question = await dao.findQuestionById(questionId);
        res.json(question);
    }

    const createQuestion = async (req, res) => {
        const quizId = req.params;
        const question = { ...req.body,
            quiz: quizId,
            id: new Date().getTime().toString() };
        const newQuestion = await dao.createQuestion(question);
        res.json(newQuestion);
    }

    const updateQuestion = async (req, res) => {
        const questionId = req.params.id;
        const status = await dao.updateQuestion(questionId, req.body);
        res.json(status);
    }

    const deleteQuestion = async (req, res) => {
        const questionId = req.params.id;
        const status = await dao.deleteQuestion(questionId);
        res.json(status);
    }


app.get("/api/quizzes/:qid/questions", getQuestionsByQuiz);
app.get("/api/quizzes/:qid/questions/:quizId", getQuestionById);
app.post("/api/quizzes/:qid/questions", createQuestion);
app.put("/api/questions/:id", updateQuestion);
app.delete("/api/questions/:id", deleteQuestion);



}