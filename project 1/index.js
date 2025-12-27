const express = require("express");

const {connectMongoDB} = require('./connection')
const userRouter = require('./routes/user')

const {logReqRes} = require('./middleware')

const app = express();

const PORT = 8000;

connectMongoDB('mongodb://127.0.0.1:27017/youtube-app-1').then(()=> console.log("Mongodb connected!"))

//middleware  - plagin
app.use(express.urlencoded({extended:false})) 
app.use(logReqRes("log.txt"));

//routes
app.use("/api/users",userRouter);

app.listen(PORT , () => console.log(`Server started at PORT:${PORT}`))
