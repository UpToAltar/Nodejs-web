import express from "express";
import { internalServerError } from "../middlewares/handle-error";
import * as services from "../services"
const register = async (req, res) => {
    try {
        const {username,email, password} = req.body;
        if (!email || !password|| !username) {
            return res.status(400).json({
                err: 1,
                mes: "Missing required",
            });
        }

        let response = await services.register({ username,email, password });

        return res.status(200).json(response);
    } catch (error) {
        internalServerError(req, res);
    }


}
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                err: 1,
                mes: "Missing required",
            });
        }

        let response = await services.login({ email, password });
        if(response) res.cookie('jwt', response.access_token, {signed:true})
        return res.status(200).json(response);
        
    } catch (error) {
        internalServerError(req, res);
    }


}
const logout = async (req, res) => {
    try {
        await res.clearCookie('jwt')
        res.redirect('/')
        
    } catch (error) {
        internalServerError(req, res);
    }


}

const refresh = async (req, res) => {
    try {
        const rftoken = req.body.refresh_token;
        if (!rftoken) {
            return res.status(400).json({
                err: 1,
                mes: "Missing required",
            });
        }

        let response = await services.refresh(rftoken);

        return res.status(200).json(response);
    } catch (error) {
        internalServerError(req, res);
    }


}

module.exports = {
    register,
    login,
    refresh,
    logout
}