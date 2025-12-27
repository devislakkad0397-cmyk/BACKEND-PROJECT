const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} :new req received\n`;
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(req.url){
            case "/":
                res.end("Home");
                break
            case "/about":
                res.end("i am devis lakkad");
                break
            default:
                res.end("404 not Found");
        }
        
    });
    // console.log(req);
    // console.log("new req rec.");
    
});

myServer.listen(8000,()=>{
    console.log("server started");
});