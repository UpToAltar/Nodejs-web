import express from 'express';

const configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    // phương thức use() chưa express cho express hiểu rằng file được static là file public 
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}
export default configViewEngine