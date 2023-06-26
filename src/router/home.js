import express from "express";
import homeController from "../controller/home"
import verifyToken from "../middlewares/verify-token";
import { isAdmin } from "../middlewares/verify-role";
import require from "../middlewares/handle-require-login";
import { resolveShowConfigPath } from "@babel/core/lib/config/files";
let router = express.Router();

router.get('/',homeController.home)
module.exports = router;
