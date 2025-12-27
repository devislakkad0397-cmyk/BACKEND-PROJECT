//npm init
//npm i express
const express = require("express");
const fs = require("fs");
const users = require('./MOCK_DATA.json');
const app = express();

const PORT = 8000;

//middleware  - plagin
app.use(express.urlencoded({extended:false})) // use ==> jo bhi data ayega form me se usko body me dal dega

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
app.get('/users',(req,res)=>{
   const html = `

        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
            
        </ul>
        `;
        res.send(html);
})
//json base rendring 
app.get('/api/users',(req,res)=>{
    return res.json(users);
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

app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

app.post('/api/users',(req,res) => {
    //TODO : CREAT NEW USER
    const body = req.body; // jobhi data fronted se send karte he vo data body me hota he
    // users.push({
    //     email : body.email,
    //     first_name:body.first_name,
    //     last_name:body.last_name,
    //     gender:body.gender
    // })
    //short method appadend in file
    users.push({...body , id : users.length+1});
      fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", message: err.message });
        }

        return res.status(201).json({
            status: "success",
            id: users.length
        });
    });
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    //     // return res.json({statusbar:"pending"})
    //      return res.json({statusbar:"success",id : users.length})
    // })
    // console.log("body",body);//output body undefined kyo ki express ko nahi pata ki ye kis prkar ka data he or use kis parkar hendal karte he uske liye middlewaremka use hota he 
    // return res.json({statusbar:"pending"})
})

app.patch('/api/users/:id',(req,res) => {
    //TODO :  EDIT THE USER WITH ID 
        const id=Number(req.params.id);
        const index=users.findIndex(u=>u.id===id);
        if(index===-1)return res.status(404).json({status:"User not found"});
        users[index]={...users[index],...req.body};
        fs.writeFileSync('./MOCK_DATA.json',JSON.stringify(users,null,2));
        res.json({status:"success",updatedUser:users[index]});
    // return res.json({statusbar:"pending"})
})

app.delete('/api/users/:id',(req,res) => {
    //TODO :  DELETE THE USER WITH ID 
     const id=Number(req.params.id);
     const index=users.findIndex(u=>u.id===id);
     if(index===-1)return res.status(404).json({status:"User not found"});
     const deletedUser=users.splice(index,1);
     fs.writeFileSync('./MOCK_DATA.json',JSON.stringify(users,null,2));
     res.json({status:"success",deletedUser});
    // return res.json({statusbar:"pending"})
})


app.listen(PORT , () => console.log(`Server started at PORT:${PORT}`))