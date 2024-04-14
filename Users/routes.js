import session from "express-session";
import * as dao from "./dao.js";

export default function UserRoutes(app) {
    // the new user is created in the request body 
    //-- dao gives it new valid id and return the new user
  const createUser = async (req, res) => { 
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  // return status
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
   };
  //return all users
  // if given role, return all users with that role
  const findAllUsers = async (req, res) => { 
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
    return;
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
   };
  // update the user with the given id 
  // return the status of the update
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    session["currentUser"] = currentUser;
    res.json(status);
   };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
        return;
    }
    const currentUser = await dao.createUser(req.body);
    console.log("current user", currentUser);
    //store it in the session's currentUser property 
    req.session["currentUser"] = currentUser; 
    console.log("currentUser stored in the session", req.session["currentUser"]);
    res.json(currentUser);
   };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    } else {
        res.sendStatus(401);
    }
   };
   // signout by destroying the session
  const signout = (req, res) => { 
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log("profile -- current user", currentUser);
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
   };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
