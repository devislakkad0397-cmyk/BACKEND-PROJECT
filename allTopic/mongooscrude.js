//npm init
//npm i express
//npm i nodemon
//npm i mongoose
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require('./MOCK_DATA.json');
const e = require("express");
const app = express();

const PORT = 8000;

//connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log("MongoDB Connected"))
.catch(err => console.log('Mongo Error',err))
//schema
const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
     lastName: {
        type:String,
        required:false
    },
     email: {
        type:String,
        required:true,
        unique:true
    },
     jobTitle: {
        type:String,
       
    },
     gender: {
        type:String,
        
    },
},{timestamps:true}) 

//model

const User = mongoose.model('user',userSchema);



//middleware  - plagin
app.use(express.urlencoded({extended:false})) // use ==> jo bhi data ayega form me se usko body me dal dega
app.use(express.json({extended:false}))


app.use((req,res,next)=>{
    // console.log("hello from middleware 1");
    fs.appendFile("./log.txt"
        ,`\n${Date.now()}:${req.ip}:${req.method}:${req.path}`
        ,(err,data)=>{
        next();
    });


    // return res.json({msg:"hello from middleware 1"});
    // next();
    
    //pahle uper ka middleware run hoga bad me niche ka hoga paar output?????
    //output me msg: hello from middleware 1 aayega kyu ki yah middleware res ko end kar deta he is liye aage code nahi badega yadi respons end nahi karta or ham postman me get all users karte all user ke name aa jate par abhi nahi ayege
    
    

    //if you hame process ko age badana he to ham kya kare ge next() call kare ge or res ko nikal dege
})

// app.use((req,res,next)=>{
//     console.log("hello from middleware 2");
//     return res.end("heyy");
// })

//routes
//html base rendring
app.get('/users',async(req,res)=>{
    const allDbUsers = await User.find({}); //({})===> all user
   const html = `

        <ul>
            ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email} </li>`).join("")}
            
        </ul>
        `;
        res.send(html);
})
//json base rendring 
app.get('/api/users',async(req,res)=>{


    const allDbUsers = await User.find({});
    res.setHeader("X-MyName","devis lakkad");//custom header
    //always add x to custom header
    
    
    
    return res.json(allDbUsers);
})
///api/users/:id PATH SAME HE GET PUT OR DELETE KA TO NAYA BANANE KI JARUR NAHI HE 

// app
// .route('/api/users/:id')
// .get((req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })
//  .patch((req,res) => {
//     //TODO :  EDIT THE USER WITH ID 
//     return res.json({statusbar:"pending"})
// })
//  .delete((req,res) => {
//     //TODO :  DELETE THE USER WITH ID 
//     return res.json({statusbar:"pending"})
// });

app.get('/api/users/:id',async(req,res)=>{
    const user =await User.findById(req.params.id);
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({err:'user not found'})
    return res.json(user);
})

app.post('/api/users',async(req,res) => {
    //TODO : CREAT NEW USER
    const body = req.body; // jobhi data fronted se send karte he vo data body me hota he
    // users.push({
    //     email : body.email,
    //     first_name:body.first_name,
    //     last_name:body.last_name,
    //     gender:body.gender
    // })
    //short method appadend in file
    if (!body || !body.first_name|| !body.last_name || !body.email || !body.gender || !body.job_title) {
                return res.status(400).json({msg:'all fildes are req...'})
        } 

      const result = await User.create({
            firstName : body.first_name,
            lastName : body.last_name,
            email : body.email,
            gender : body.gender,
            jobTitle : body.job_title,
        })
        console.log(result);
        return res.status(201).json({msg:'success'})

    // users.push({...body , id : users.length+1});
    //   fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
    //     if (err) {
    //         return res.status(500).json({ status: "error", message: err.message });
    //     }
        
    //     return res.status(200).json({
    //         status: "success",
    //         id: users.length
    //     });
    // });
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    //     // return res.json({statusbar:"pending"})
    //      return res.json({statusbar:"success",id : users.length})
    // })
    // console.log("body",body);//output body undefined kyo ki express ko nahi pata ki ye kis prkar ka data he or use kis parkar hendal karte he uske liye middlewaremka use hota he 
    // return res.json({statusbar:"pending"})
})

app.patch('/api/users/:id',async(req,res) => {
     
        await User.findByIdAndUpdate(req.params.id,{lastName:"changed"});

    //TODO :  EDIT THE USER WITH ID 
        // const id=Number(req.params.id);
        // const index=users.findIndex(u=>u.id===id);
        // if(index===-1)return res.status(404).json({status:"User not found"});
        // users[index]={...users[index],...req.body};
        // fs.writeFileSync('./MOCK_DATA.json',JSON.stringify(users,null,2));
        // res.json({status:"success",updatedUser:users[index]});
    return res.json({statusbar:"success"})
})

app.delete('/api/users/:id',async(req,res) => {
    await User.findByIdAndDelete(req.params.id);
    //TODO :  DELETE THE USER WITH ID 
    //  const id=Number(req.params.id);
    //  const index=users.findIndex(u=>u.id===id);
    //  if(index===-1)return res.status(404).json({status:"User not found"});
    //  const deletedUser=users.splice(index,1);
    //  fs.writeFileSync('./MOCK_DATA.json',JSON.stringify(users,null,2));
    //  res.json({status:"success",deletedUser});
    return res.json({statusbar:"deleted"})
})


app.listen(PORT , () => console.log(`Server started at PORT:${PORT}`))