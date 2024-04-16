import model from "./model.js";
export const createModule = (module) => {
    delete module._id; // remove _id field just in case client sends it
    return model.create(module);
}
export const findAllModules = () => model.find();
export const findModulesByCourse = (courseId) => model.find({course: courseId});
export const updateModule = (moduleId, module) => model.updateOne({id: moduleId}, {$set: module});
export const deleteModule = (moduleId) => model.deleteOne({id: moduleId});