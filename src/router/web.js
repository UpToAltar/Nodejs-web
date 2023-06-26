import express from "express";
import auth from "./auth"
import home from "./home"
import user from "./user"
import book from "./book"
import chat from "./chat"

let router = express.Router();

let initWebRouter = (app) => {
    app.use('/', home)
    app.use('/book',book)
    app.use("/auth", auth)
    app.use("/user", user);
    app.use("/chat", chat);
    return app.use("/", router);
}

export default initWebRouter

