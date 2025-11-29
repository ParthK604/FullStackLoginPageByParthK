import express from "express";
const router=express.Router();

app.post("/",(req,res)=>{
  res.send("GOt the info after signup");
});

app.post("/login",(req,res)=>{
    res.send("Got the info after login");
});

module.exports=router;