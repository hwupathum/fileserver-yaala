const express = require("express");
const app = express();
const {isLogged, isNotLogged} = require('./../middlewares/auth');
const {folder} = require('./../middlewares/folder');

const authRouter = require("./AuthRouter");
const userRouter = require("./UserRouter");
const fileRouter = require("./FileRouter");
const folderRouter = require("./FolderRouter");

// middlewares
app.use("/auth", isNotLogged);
app.use("/user", isLogged);
app.use("/file", isLogged);
app.use("/folder", isLogged);

app.use("/folder", folder);

// routers
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);
app.use("/folder", folderRouter);

module.exports = app;
