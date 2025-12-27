const http = require("http");
const fs = require("fs");
const url = require("url");

function myhandler(req,res){
      if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} :new req received\n`;
    const myurl = url.parse(req.url,true);// true for qurey perameter pass  and creat object for query
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(myurl.pathname){
            case "/":
                if(req.method === 'GET') res.end("Home page")
                break
            case "/about":
                const username = myurl.query.name;
                res.end(`hi ${username}`);
                break
            case "/search":
                const search = myurl.query.search_query;//youtube work
                res.end("Hey this is your result : " + search);
            case "/signup":
                if(req.method === 'GET') res.end('this is signup form');
                else if (req.method === "POST"){
                    //db query
                    res.end("success");
                }
            default:
                res.end("404 not Found");
        }
        
    });
    // console.log(req);
    // console.log("new req rec.");
}
const myServer = http.createServer((req,res)=>{myhandler});

myServer.listen(8000,()=>{
    console.log("server started");
});