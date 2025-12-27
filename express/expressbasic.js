const http = require("http");

const express = require("express");
//npm init
//npm init --y
//npm i url
//npm i express

const app = express();

app.get("/",(req,res)=>{
    return res.send("hello from home page");
});

// app.get("/about",(req,res)=>{
//     return res.send("hello from about page"+ " hey "+ req.query.name);
// });

app.get("/about",(req,res)=>{
    return res.send(`Hello ${req.query.name}`);
});

app.listen(8000 , ()=>console.log("server startrd!"));

//no need 

// const myServer = http.createServer(app)
  

// myServer.listen(8000,()=>{
//     console.log("server started");
// });