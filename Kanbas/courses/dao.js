import e from "express";
import model from "./model.js";
export const createCourse = (course) => {
    delete course._id; // remove _id field just in case client sends it
    return model.create(course);
}

export const findAllCourses = () => model.find();
export const findCourseBycourseId = (courseId) => model.findOne({id : courseId});
export const findCourseByName = (name) => model.findOne({ name: name });
export const updateCourse = (courseId, course) => model.updateOne({ id: courseId }, { $set: course });
export const deleteCourse = (courseId) => model.deleteOne({ id: courseId });
