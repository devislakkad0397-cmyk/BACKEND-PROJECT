const fs = require("fs");
const os = require("os");

//sycn... blocking

console.log("1");
const result = fs.readFileSync("contacts.txt","utf-8");
console.log(result);
console.log("2");

//ans
//1
//readfile content ===> jaya lag iaa puru no thay tya lagi 2 print no thay (blocking)
//2

//async...nonblocking

console.log("1");
fs.readFile("contacts.txt","utf-8",(err,result)=>{
    console.log(result);
});
console.log("2");
//ans
//1
//2
//file content why ???? ====> not block console.log("2") 

//defult thread pool size == 4
//max? depence apon  pc my pc thread size 12 so max thread pool size increesing 12 tak
 console.log(os.cpus().length);