const User = require('../models/user')
const {setUser}  = require('../service/auth')

async function handleUserSignup (req,res){
    const {name,email,password}  = req.body;
    
    if(!name || !email || !password){
        return res.render('signup',{
            error: "All fields are required"
        });
    }
    
    try {
        await User.create({
            name,
            email,
            password,
        })
        return res.redirect('/login');
    } catch (error) {
        if(error.code === 11000){
            return res.render('signup',{
                error: "Email already exists"
            });
        }
        return res.render('signup',{
            error: "Something went wrong. Please try again."
        });
    }
}
async function handleUserLogin (req,res){
    const {email,password}  = req.body;
    const user = await User.findOne({email,password});
    
    if(!user) return res.render('login',{
        error : "Invalid User Name or password",
    });
    // const sessionId = uuidv4();
    // setUser(sessionId,user);
    const token = setUser(user);
    // res.cookie('uid',token);
     res.cookie('token', `Bearer ${token}`);
     return res.redirect("/")
    // res.cookie('uid',sessionId);
    // return res.redirect('/');
}
module.exports = { handleUserSignup , handleUserLogin}; 