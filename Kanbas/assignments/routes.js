//import db from "../Database/index.js";
import { get } from "mongoose";
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  /*
  app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
            .filter((a) => a.course === cid);
            console.log("get assignments for teh course", cid, ":", assignments);
        res.send(assignments);)}

    // create
    // return the new assignment (courseId already overriden in the newAssignment object)
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
    });
    // update
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex(
      (a) => a._id === aid);
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body
    };
    res.sendStatus(204);
  });
   // delete
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
      });
   */
  const getAllAssignments = async (req, res) => {
      const { cid } = req.params;
      const assignments = await dao.findAssignmentByCourse(cid);
      console.log("get assignments for course", cid, ":", assignments);
      /*
      if (!assignment) {
          res.status(404).send("Assignment not found");
          return;
      }*/
      res.json(assignments);
  };
  const createAssignment = async (req, res) => {
      const { cid } = req.params;
      // create one via the dao
      const assignment = { ...req.body,
        course: cid,
        id: new Date().getTime().toString() };
      const newAssignment = await dao.createAssignment(assignment);
      res.send(newAssignment);
  };
  const updateAssignment = async (req, res) => {
      const { aid } = req.params;
      const assignment = req.body;
      const status = await dao.updateAssignment(aid, assignment);
      res.json(status)
  };
  const deleteAssignment = async (req, res) => {
      const { aid } = req.params;
      const status = await dao.deleteAssignment(aid);
      res.json(status);
  };
  app.get("/api/courses/:cid/assignments", getAllAssignments);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
}
