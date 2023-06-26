import express from "express";
import authController from "../controller/auth"
import verifyToken from "../middlewares/verify-token"
import {isAdmin} from "../middlewares/verify-role"
let router = express.Router();


router.post('/register',authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refresh);

module.exports = router;