import db from "../models"
import jwt from "jsonwebtoken"
import * as services from "../services"

const chat = async (req, res) => {
    let data = await db.User.findAll()
    const token = req.signedCookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        let id = !err ? user.id : -1;
        let name = !err ? user.username : 'Not found'
        let avata = !err && user.avata ? user.avata : "https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-avatar-user-basic-abstract-circle-background-flat-color-icon-png-image_1647265.jpg";
        res.render('chat.ejs',{dataUser: data, tokenData: token, userName:name, avata:avata,id:id})
    });

    
}
const room = async (req, res) => {
    try {
        const body = req.query;
        res.render(`room.ejs`,{username:body.username, room:body.room})
        
    } catch (error) {
        internalServerError(req, res);
    }
    
}
module.exports = {
    chat,
    room
}