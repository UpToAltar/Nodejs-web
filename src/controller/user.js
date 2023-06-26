import express from "express";
import { internalServerError } from "../middlewares/handle-error";
import * as services from "../services"
const cloudinary = require("cloudinary").v2;
const getUser = async (req, res) => {
    try {
        const id = req.params
        let response = await services.getUser(id);

        return res.status(200).json(response);
    } catch (error) {
        internalServerError(req, res);
    }
}
const updateUser = async (req, res) => {
    try {
        const id = req.params
        const body = req.body
        if(!body.username && !body.email && !body.role_code){
            return res.status(400).json({
                err:1,
                mes:"Missing required"
            })
        }
        let response = await services.updateUser(id,body);
        return res.redirect('/')
        
    } catch (error) {
        internalServerError(req, res);
    }
}
const deleteUser = async (req, res) => {
    try {
        
        const id = req.body
        
        let response = await services.deleteUser(id);
        return res.redirect('/')
        
    } catch (error) {
        internalServerError(req, res);
    }
}

const createUser = async (req, res) => {
    try {
        
        const body = req.body
        
        let response = await services.createUser(body);
        return res.status(200).json(response);
        
    } catch (error) {
        internalServerError(req, res);
    }
}

const uploadImage= async (req, res) => {
    try {
        const id = req.params.id;
        const fileData = req.file
        if(!fileData||!id){
            cloudinary.uploader.destroy(fileData.filename);
            return res.status(400).json({
                err:1,
                mes:"Missing required"
            })
        }
        
        let response = await services.uploadImage(fileData, id);
        return res.redirect('/auth/login');
        
    } catch (error) {
        internalServerError(req, res);
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    createUser,
    uploadImage,
}