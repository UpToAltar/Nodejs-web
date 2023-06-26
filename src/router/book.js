import express from "express";
import bookController from "../controller/book";
import verifyToken from "../middlewares/verify-token";
import { isAdmin } from "../middlewares/verify-role";
import require from "../middlewares/handle-require-login";

let router = express.Router();

router.get("/", bookController.book);
router.get("/:page", bookController.book);
router.post("/insert", bookController.insert);
router.post("/create", bookController.create);
router.post("/update/:id", bookController.update);
router.delete("/delete/:id", bookController.deleteBook);
router.get("/search", bookController.book);
router.get("/:page/search", bookController.book);
router.get("/detail/:id", bookController.bookDetails);
router.post("/detail/comment/post", bookController.comment);
router.delete("/detail/comment/delete/:id", bookController.commentDelete);
router.get("/test/:id", bookController.test);

module.exports = router;
