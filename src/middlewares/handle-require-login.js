import db from "../models"
const requireLogin = async (req,res,next)=> {
    
    if(!req.signedCookies.jwt){
        res.redirect('/auth/login');
        return;
    } else{
        next();
    }
    
}

module.exports = {
    requireLogin
}