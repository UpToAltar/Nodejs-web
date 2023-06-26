import express from "express";
import chatController from "../controller/chat";
import verifyToken from "../middlewares/verify-token";
import { isAdmin } from "../middlewares/verify-role";
import require from "../middlewares/handle-require-login";

let router = express.Router();


router.get("/", chatController.chat);
router.get("/room", chatController.room);
module.exports = router;
