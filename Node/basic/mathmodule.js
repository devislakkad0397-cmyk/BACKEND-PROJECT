// function add(a,b){
//     return a+b;
// }

// function sub(a,b){
//     return a-b;
// }
// module.exports = add;  this is wrong method koyo ki sub function overwrite kar raha he is liye solution is pass object 
// module.exports = sub;

// module.exports = {    on method is this 
//     add,
//     sub
// }

// second method is 
// add function pass as addfunction and sub pass as subfunction
// module.exports = {
//    addfunction:add,
//    subfunction:sub
// }


//second method of export the modules
exports.add = (a,b)=>a+b;

exports.sub = (a,b)=>a-b;