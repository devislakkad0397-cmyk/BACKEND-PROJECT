// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "devis@6767@"

function setUser(user){
  
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret);
}

// function setUser(id , user){
//     sessionIdToUserMap.set(id,user);
// }

function getUser(token){
    if(!token) return null;
    try {
            return jwt.verify(token,secret);

    } catch (error) {
        return null;
    }
    // return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}