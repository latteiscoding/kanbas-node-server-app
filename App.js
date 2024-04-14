import express from 'express'; // Import express
import session from "express-session";
import Lab5 from './Lab5.js'; // Import Lab5.js  
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import "dotenv/config";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import QuizRoutes from './Kanbas/quizzes/routes.js';
import Hello from './Hello.js'; // Import Hello.js
import cors from 'cors'; // Import cors : to configure CORS security policy
const app = express() // Create an express instance and store it in app
app.use(
    cors({
        credentials: true, // support cookies
        origin: process.env.FRONTEND_URL, // use different front end URL in production and development
    })
); 
// but it's a bad practice to have credentials in the source code
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
// default options
// needs to be tweaked to work in a remote server such as AWS, Render, Heroku, etc.
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(
session(sessionOptions)
);
app.use(express.json()); // tells your server to automatically parse JSON-formatted request bodies and convert them into JavaScript objects 
UserRoutes(app);
Hello(app) // Call the Hello function and pass app as an argument  
ModuleRoutes(app);
CourseRoutes(app); 
AssignmentRoutes(app);
QuizRoutes(app);
Lab5(app) // Call the Lab5 function and pass app as an argument
app.listen(process.env.PORT || 4000) // uses the PORT environment variable if available, or uses 4000 otherwise when running locally on our machines.

