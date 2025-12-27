const fs = require("fs");

//sync... blocking

// fs.writeFileSync("./test.txt",'hey');
//const result = fs.writeFileSync("./test.txt",'hey');

// creat file     this is file name    write in file test   ====> sentext
// if you any change so "hey devis" ====> "hey" so hey overwrite so test.txt me hey ayega  

//async.. non blocking

// fs.writeFile("./test.txt","hey async",(err)=>{});

//file creat  file name    message     if any error so this excute

//read file sync...

//give result in one varaibal 
// const result = fs.readFileSync("./contacts.txt","utf-8");
// //give result(file readable)  what file read   conse formet me (may file is video audio ho sakta he)
// console.log(result);

//read file in async..
//not give result in varaibal we need callback function
// fs.readFile("./contacts.txt","utf-8",(err,result)=>{
// //read        this file       formate to read  callback function ====> no variable only call back function 

//     if(err){
//         console.log("error",err);
//     }
//     else
//     {
//         console.log(result);
//     }
// })

//update not override new message print in that file
fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());

fs.cpSync("./test.txt","./copy.txt");
//copy the test file in new copy file

fs.unlinkSync("./copy.txt");
//delete the file
fs.mkdirSync("devis");
//make directory 
fs.mkdirSync("my-mkdirfile/a/b/c/d/e",{recursive:true});
//make file with a b c d e folder

const r = fs.statSync("./test.txt");
console.log(r);
//🔍 stat se kya-kya pata chalta hai?

// 📄 File hai ya 📂 Folder

// 📦 Size (bytes me)

// ⏰ Created / Modified time

// 🔐 Permissions info


/*****************************************************
 * Node.js fs Module – ALL COMMON EXAMPLES
 * ❌ No readFile / writeFile / update code
 * ✅ Only file & folder operations
 * 📄 One-page demo code with comments
 *****************************************************/

const fs = require("fs");
const path = require("path");

/* =========================================
   1. CREATE FOLDER (NESTED)
   ========================================= */
fs.mkdirSync("demo/a/b/c", { recursive: true });
// Creates demo/a/b/c folders even if parent folders don't exist


/* =========================================
   2. CHECK FILE / FOLDER EXISTS
   ========================================= */
if (fs.existsSync("demo")) {
  console.log("demo folder exists");
} else {
  console.log("demo folder not found");
}


/* =========================================
   3. RENAME / MOVE FILE OR FOLDER
   ========================================= */
fs.renameSync("demo", "demo-renamed");
// demo → demo-renamed


/* =========================================
   4. READ DIRECTORY (LIST FILES/FOLDERS)
   ========================================= */
const items = fs.readdirSync("demo-renamed");
console.log("Inside demo-renamed:", items);
// Returns array of files/folders inside directory


/* =========================================
   5. FILE / FOLDER INFORMATION
   ========================================= */
const info = fs.statSync("demo-renamed");

console.log("Is File:", info.isFile());        // false
console.log("Is Directory:", info.isDirectory()); // true
console.log("Size:", info.size);               // size in bytes


/* =========================================
   6. CREATE EMPTY FILE (NO WRITE)
   ========================================= */
fs.closeSync(fs.openSync("empty.txt", "w"));
// Creates an empty file without writing content


/* =========================================
   7. COPY FILE
   ========================================= */
fs.copyFileSync("empty.txt", "empty-copy.txt");
// Copies empty.txt to empty-copy.txt


/* =========================================
   8. CHECK ACCESS / PERMISSION
   ========================================= */
try {
  fs.accessSync("empty.txt");
  console.log("File is accessible");
} catch (err) {
  console.log("No access to file");
}


/* =========================================
   9. DELETE FILE
   ========================================= */
fs.unlinkSync("empty.txt");
fs.unlinkSync("empty-copy.txt");
// Deletes files


/* =========================================
   10. REMOVE FOLDER (OLD WAY)
   ========================================= */
fs.rmdirSync("demo-renamed", { recursive: true });
// Deletes folder and all subfolders


/* =========================================
   11. REMOVE FILE OR FOLDER (MODERN WAY)
   ========================================= */
fs.rmSync("demo-renamed", { recursive: true, force: true });
// Recommended replacement for unlink + rmdir


/* =========================================
   12. PATH JOIN (SAFE PATH CREATION)
   ========================================= */
const folderPath = path.join(__dirname, "data", "images");
console.log(folderPath);
// Creates OS-safe path


/*****************************************************
 * ✅ END OF fs ONE-PAGE EXAMPLES
 *****************************************************/
