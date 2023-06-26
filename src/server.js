import express from "express";
import configViewEngine from "./config/configViewEngine";
import connectDB from "./config/connectDB";
import initWebRouter from "./router/web";
import cookieParser from "cookie-parser";
import socketIO from "./config/socket";

const app = express();
const port = process.env.PORT || 8000;
const server = require("http").Server(app);
const io = require("socket.io")(server);

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
configViewEngine(app)
connectDB(app)
initWebRouter(app);
socketIO(io, server);

// Xử lí 404 not found
app.get('/auth/register', (req, res) => {
    res.render('register.ejs')
})
app.get("/auth/login", (req, res) => {
    res.render("login.ejs");
    console.log(req.body);
});
app.use((req, res, next) => {
    return res.render("404.ejs");
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
}); 

