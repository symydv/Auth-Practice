import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import {connectDB} from "./DB/connectDB.js"
import "dotenv/config";  //to use .env file we need to configure it first by using "dotenv.config()". This will load the environment variables from the .env file into process.env, allowing us to access them in our code.
//check why we used this import version of dotenv config

const app = express();

app.use(express.json())  //to parse json data from request body
app.use(cookieParser()) //to parse cookies from request
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true //so we can send cookies and authentication headers
}))
import authRoutes from "./routes/auth.route.js"
app.use("/api/auth", authRoutes); //here we prefixed all the authroutes with "/api/auth" so that we can access them like "/api/auth/signup" or "/api/auth/login" instead of just "/signup" or "/login". This is a common practice to organize routes and make it clear that these routes are related to authentication.

app.listen(3000, ()=>{
  connectDB();
  console.log('server running on port 3000');
  
})

