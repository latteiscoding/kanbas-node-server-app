import express from "express-session";
import * as dao from "./dao.js";
import { get } from "mongoose";
//import Database from "../Database/index.js";

export default function CourseRoutes(app) {

  /* old codes
  // create a new course
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body,
      _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });

    // getCourseById
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses
      .find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });

  //updateCourse
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  });

  // get all courses
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });

  //delete the course of the given id
  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses
      .filter((c) => c._id !== id);
    res.sendStatus(204);
  });

  */

  // create a new course + handle duplicate courseIds
  const createCourse = async (req, res) => {
    //check if the courseId already exists
    const course = await dao.findCourseBycourseId(req.body.id);
    if (course) {
      res.status(400).json({ message: "CourseId already exists" });
      return;
    }
    const newCourse = await dao.createCourse(req.body);
    console.log("newCourse created: ", newCourse);
    res.json(newCourse);
  };

  const getCourseById = async (req, res) => {
    const { id } = req.params;
    const course = await dao.findCourseBycourseId(id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.json(course);
  };

  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateCourse(id, req.body);
    res.json(status);
  };

  const getAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  }

  const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.deleteCourse(id);
    res.json(status);
  }

  app.post("/api/courses", createCourse);
  app.get("/api/courses/:id", getCourseById);
  app.put("/api/courses/:id", updateCourse);
  app.get("/api/courses", getAllCourses);
  app.delete("/api/courses/:id", deleteCourse);

}
