import db from "../models"
import bcrypt from "bcryptjs"
const cloudinary = require("cloudinary").v2;

const hassPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(7));

export const getUser = (id) => new Promise (async (resolve, reject) => {
    try {
        
        let response = await db.User.findOne({
            where: id
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const updateUser = (id,body) => new Promise (async (resolve, reject) => {
    try {
        let response = await db.User.update(body,{
            where: id
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const deleteUser = (id) => new Promise (async (resolve, reject) => {
    try {
        let response = await db.User.destroy({
            where : id
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const createUser = (body) => new Promise (async (resolve, reject) => {
    try {
        body.password = hassPassword(body.password)
        const email = body.email
        let [user, created] = await db.User.findOrCreate({
            where: {email:email},
            defaults : body
        })
        
        resolve({
            err:created ? 0:1,
            mes: created ? 'Add successfully' :'Email is used',
        })
    } catch (error) {
        reject(error)
    }
})

export const uploadImage = (fileData,id) => new Promise (async (resolve, reject) => {
    try {
        if (fileData) {
            
            const oldFileName = await db.User.findOne({
                where: { id: id },
            });
            if(oldFileName.filename) {
                cloudinary.uploader.destroy(oldFileName.filename);
            }
        }
        const fileName = fileData.filename
        const body = {
            filename: fileName,
            avata: fileData.path
        }
        const response = await db.User.update(body,{
            where: {id:id},
        })
        
        resolve({
            err:response ? 0:1,
            mes: response ? 'Add successfully' :'Add failed',
        })
        if(fileData && !response){
            cloudinary.uploader.destroy(fileData)
        }
    } catch (error) {
        reject(error)
        if (fileData && !response) {
            cloudinary.uploader.destroy(fileData);
        }
    }
})

