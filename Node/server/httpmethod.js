//url old method
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {

    // favicon request ignore
    if (req.url === "/favicon.ico") {
        res.end();
        return;
    }

    // request log
    const log = `${Date.now()}: ${req.method} ${req.url} : new req received\n`;

    // old way (still working but deprecated in new node)
    const myurl = url.parse(req.url, true); 
    // true => query parameter object create karega

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            res.end("server error");
            return;
        }

        switch (myurl.pathname) {

            // ================== GET ==================
            case "/":
                if (req.method === "GET") {
                    res.end("Home page");
                    return;
                }
                break;

            case "/about":
                if (req.method === "GET") {
                    const username = myurl.query.name;
                    res.end(`hi ${username}`);
                    return;
                }
                break;

            case "/search":
                if (req.method === "GET") {
                    const search = myurl.query.search_query; // youtube work
                    res.end("Hey this is your result : " + search);
                    return;
                }
                break;

            // ================== POST ==================
            case "/signup":
                if (req.method === "GET") {
                    res.end("this is signup form");
                    return;
                }
                else if (req.method === "POST") {
                    // db insert query
                    res.end("signup success");
                    return;
                }
                break;

            // ================== PUT ==================
            // full data update (photo, video, profile, etc.)
            case "/user":
                if (req.method === "PUT") {
                    // full record replace
                    res.end("User data fully updated (PUT)");
                    return;
                }

                // ================== PATCH ==================
                // partial update (only name, email, etc.)
                if (req.method === "PATCH") {
                    // only selected fields update
                    res.end("User data partially updated (PATCH)");
                    return;
                }

                // ================== DELETE ==================
                if (req.method === "DELETE") {
                    // delete record from database
                    res.end("User deleted successfully");
                    return;
                }
                break;

            // ================== DEFAULT ==================
            default:
                res.statusCode = 404;
                res.end("404 not Found");
                return;
        }
    });
});

myServer.listen(8000, () => {
    console.log("server started");
});











// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const myServer = http.createServer((req,res)=>{
//     if(req.url === "/favicon.ico") return res.end();
//     const log = `${Date.now()}: ${req.method} ${req.url} :new req received\n`;
//     const myurl = url.parse(req.url,true);// true for qurey perameter pass  and creat object for query
//     fs.appendFile('log.txt',log,(err,data)=>{
//         switch(myurl.pathname){
//             case "/":
//                 if(req.method === 'GET') res.end("Home page")
//                 break
//             case "/about":
//                 const username = myurl.query.name;
//                 res.end(`hi ${username}`);
//                 break
//             case "/search":
//                 const search = myurl.query.search_query;//youtube work
//                 res.end("Hey this is your result : " + search);
//             case "/signup":
//                 if(req.method === 'GET') res.end('this is signup form');
//                 else if (req.method === "POST"){
//                     //db query
//                     res.end("success");
//                 }
//             default:
//                 res.end("404 not Found");
//         }
        
//     });
//     // console.log(req);
//     // console.log("new req rec.");
    
// });

// myServer.listen(8000,()=>{
//     console.log("server started");
// });
 // switch(req.url)







//url new method

// const http = require("http");
// const fs = require("fs");

// const myServer = http.createServer((req, res) => {

//     // favicon request ignore
//     if (req.url === "/favicon.ico") {
//         res.end();
//         return;
//     }

//     // request log
//     const log = `${Date.now()}: ${req.method} ${req.url} : new req received\n`;

//     // ✅ NEW & SAFE URL METHOD (url.parse ka replacement)
//     const myurl = new URL(req.url, `http://${req.headers.host}`);
//     // myurl.pathname       => route
//     // myurl.searchParams  => query parameters

//     fs.appendFile("log.txt", log, (err) => {
//         if (err) {
//             res.statusCode = 500;
//             res.end("server error");
//             return;
//         }

//         switch (myurl.pathname) {

//             // ================== GET ==================
//             case "/":
//                 if (req.method === "GET") {
//                     res.end("Home page");
//                     return;
//                 }
//                 break;

//             case "/about":
//                 if (req.method === "GET") {
//                     const username = myurl.searchParams.get("name");
//                     res.end(`hi ${username}`);
//                     return;
//                 }
//                 break;

//             case "/search":
//                 if (req.method === "GET") {
//                     const search = myurl.searchParams.get("search_query");
//                     res.end("Hey this is your result : " + search);
//                     return;
//                 }
//                 break;

//             // ================== POST ==================
//             case "/signup":
//                 if (req.method === "GET") {
//                     res.end("this is signup form");
//                     return;
//                 }
//                 else if (req.method === "POST") {
//                     // db insert query
//                     res.end("signup success");
//                     return;
//                 }
//                 break;

//             // ================== PUT / PATCH / DELETE ==================
//             case "/user":

//                 // PUT => full update
//                 if (req.method === "PUT") {
//                     res.end("User data fully updated (PUT)");
//                     return;
//                 }

//                 // PATCH => partial update
//                 if (req.method === "PATCH") {
//                     res.end("User data partially updated (PATCH)");
//                     return;
//                 }

//                 // DELETE => remove record
//                 if (req.method === "DELETE") {
//                     res.end("User deleted successfully");
//                     return;
//                 }
//                 break;

//             // ================== DEFAULT ==================
//             default:
//                 res.statusCode = 404;
//                 res.end("404 not Found");
//                 return;
//         }
//     });
// });

// myServer.listen(8000, () => {
//     console.log("server started on port 8000");
// });












// GET     => server se data lena
// POST    => server ko data bhejna (db me store)
// PUT     => pura data update (photo, profile, etc.)
// PATCH   => thoda sa data change (name, email)
// DELETE  => account / data delete