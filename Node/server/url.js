const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} :new req received\n`;
    const myurl = url.parse(req.url,true);// true for qurey perameter pass  and creat object for query
    console.log(myurl);
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(myurl.pathname){
            case "/":
                res.end("Home");
                break
            case "/about":
                const username = myurl.query.name;
                res.end(`hi ${username}`);
                break
            case "/search":
                const search = myurl.query.search_query;//youtube work
                res.end("Hey this is your result : " + search);
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
 // switch(req.url)

//https://www.devislakkad.dev/

//https://     www.devislakkad.dev                                /
//protocol:    domain-user friendly name of ip address              path:/homepage or
//hypertext     my server                                            rootpage   
//tranfer
//protocol
//secure

///about?userid=1&=2 ===> query parameters

