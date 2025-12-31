const { getUser } = require('../service/auth');

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token || req.cookies?.TOKEN;
    if(
        !tokenCookie || 
        !tokenCookie.startsWith("Bearer")
    )
    return next();
     
    const token = tokenCookie.split("Bearer ")[1];
    if(!token) return next();
    
   const user = getUser(token);

   req.user = user;
   return next();
}


function restrictTo(roles){
    return function(req,res,next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.status(403).end('Unauthorized');
       return next();
    };
    
}

// async function restricToLoggedinUserOnly(req, res, next) {
//     // const userUid = req.cookies?.uid;

//     // ❗ headers hamesha lowercase me hote hain
//     const userUid = req.headers["authorization"];

//     // ❗ agar header hi nahi mila to split() mat chalao
//     if (!userUid) return res.redirect("/login");

//     // ❗ "Brearer" galat tha → "Bearer"
//     const token = userUid.split("Bearer ")[1];

//     // ❗ agar token missing hai
//     if (!token) return res.redirect("/login");

//     // const user = getUser(userUid);
//     const user = getUser(token);

//     // ❗ pehle userUid check ho raha tha (galat)
//     // ❗ actual user check hona chahiye
//     if (!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     // const userUid = req.cookies?.uid;

//     const userUid = req.headers["authorization"];

//     // ❗ yahi se tumhara error aa raha tha
//     // ❗ agar header nahi hai to split() crash karega
//     if (!userUid) {
//         return next(); // optional auth → silently continue
//     }

//     // ❗ spelling fix: Brearer ❌ → Bearer ✅
//     const token = userUid.split("Bearer ")[1];

//     // ❗ token na mile to aage badh jao
//     if (!token) {
//         return next();
//     }

//     // const user = getUser(userUid);
//     const user = getUser(token);

//     req.user = user;
//     next();
// }

module.exports = {
    checkForAuthentication,
    restrictTo,
    // restricToLoggedinUserOnly,
    // checkAuth,
};
