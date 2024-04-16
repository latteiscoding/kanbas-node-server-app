import model from "./model.js";
export const createAssignment = (assignment) => {
    delete assignment._id; // remove _id field just in case client sends it
    return model.create(assignment);
}
export const findAllAssignments = () => model.find();
export const findAssignmentById = (assignmentId) => model.findOne({id: assignmentId});
export const findAssignmentByCourse = (courseId) => model.find({course: courseId});
export const updateAssignment = (assignmentId, assignment) => model.updateOne({id: assignmentId}, {$set: assignment});
export const deleteAssignment = (assignmentId) => model.deleteOne({id: assignmentId});