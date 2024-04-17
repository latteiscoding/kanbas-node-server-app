//import db from "../Database/index.js";
import * as dao from "./dao.js";
export default function QuizRoutes(app) {
  /*
  app.get("/api/courses/:cid/quizzes", (req, res) => {
        const { cid } = req.params;
        const quizzes = db.quizzes
            .filter((q) => q.course === cid);
        res.send(quizzes);
    });
  app.post("/api/courses/:cid/quizzes", (req, res) => {
      const { cid } = req.params;
      const newQuiz = {
          ...req.body,
          course: cid,
          quizId: new Date().getTime().toString(),
      };
      db.quizzes.push(newQuiz);
      res.send(newQuiz);
  });
  //update
  app.put("/api/quizzes/:qid", (req, res) => {
    const { qid } = req.params;
    const quizIndex = db.quizzes.findIndex(
      (q) => q.quizId === qid);
    db.quizzes[quizIndex] = {
      ...db.quizzes[quizIndex],
      ...req.body // req.body is the updated quiz object
    };
    res.sendStatus(204);
    });
  //delete
  app.delete("/api/quizzes/:qid", (req, res) => {
      const { qid } = req.params;
      db.quizzes = db.quizzes.filter((q) => q.quizId !== qid);
      res.sendStatus(200);
    });
  */
  const getQuizzesByCourse = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesByCourse(cid);
    res.json(quizzes);
  }

  // create a new quiz with the given course id and give it a unique id
  const createQuiz = async (req, res) => {
    const { cid } = req.params;
    const quiz = { ...req.body,
      course: cid,
      id: new Date().getTime().toString() };
    const newQuiz = await dao.createQuiz(quiz);
    res.json(newQuiz);
  }
  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.updateQuiz(qid, req.body);
    res.json(status);
  }
  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.json(status);
  }
  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    res.json(quiz);
  }

  
  app.get("/api/courses/:cid/quizzes", getQuizzesByCourse);
  app.get("/api/quizzes/:qid", findQuizById);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
  

}
