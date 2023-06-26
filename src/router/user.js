import express from "express";
import userController from "../controller/user";
import verifyToken from "../middlewares/verify-token";
import { isAdmin } from "../middlewares/verify-role";
import require from "../middlewares/handle-require-login";
import uploadCloud from "../middlewares/cloudinary-upload"
let router = express.Router();
router.post("/upload/image/:id", uploadCloud.single('avata'), userController.uploadImage);
router.use(verifyToken)
router.use(isAdmin)
router.get("/detail/:id",require.requireLogin, userController.getUser);
router.post("/update/:id",require.requireLogin, userController.updateUser);
router.post("/delete",require.requireLogin, userController.deleteUser);
router.post("/create",require.requireLogin, userController.createUser);


module.exports = router;
