import express from 'express'; // Import express
import Lab5 from './Lab5.js'; // Import Lab5.js  
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import Hello from './Hello.js'; // Import Hello.js
import cors from 'cors'; // Import cors : to configure CORS security policy
const app = express() // Create an express instance and store it in app
app.use(cors()); 
app.use(express.json()); // tells your server to automatically parse JSON-formatted request bodies and convert them into JavaScript objects 
Hello(app) // Call the Hello function and pass app as an argument  
ModuleRoutes(app);
CourseRoutes(app); 
AssignmentRoutes(app);
Lab5(app) // Call the Lab5 function and pass app as an argument
app.listen(process.env.PORT || 4000) // uses the PORT environment variable if available, or uses 4000 otherwise when running locally on our machines.

