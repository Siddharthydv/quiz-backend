import dotenv from 'dotenv'
dotenv.config();

import  express from "express";
import authenticate from "./authentication";    //authentication middleware
import { STATIC_USER } from "./config";         // hardcoded credentials
import quizRouter from "./routers/quizRouter";  //router for quiz related routes
import cookieParser from "cookie-parser";
import cors from 'cors'

const app=express();

app.use(
    cors({
      origin: process.env.ALLOWED_URL, // Allow frontend URL
      credentials: true, // Allow cookies
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    })
  );
app.use(express.json());
app.use(cookieParser());


app.use('/quizzes',authenticate,quizRouter)
app.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password)
    if(email!==STATIC_USER.email || password!==STATIC_USER.password)
    {
        res.status(400).json("wrong credentials");
        return ;
    }
    res.cookie("auth", "logged_in", { 
        httpOnly: true, 
        secure: true, 
        sameSite: "none", 
        path: "/", 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });    res.status(200).json({ message: "Login successful" });
    return ;
})
app.get('/logout', authenticate, (req, res) => {
    res.clearCookie("auth", { httpOnly: true, secure: true, sameSite: "none" });
    res.status(200).json({ message: "Logged out successfully" });
});

app.get('/healthy',(req,res)=>{
    res.json("healthy");
})
app.listen(3000,()=>{
    console.log('server running');
})