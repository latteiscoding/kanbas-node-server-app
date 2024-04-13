import db from "../Database/index.js";

function QuizRoutes(app) {
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
}
export default QuizRoutes;