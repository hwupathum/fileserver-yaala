const express = require("express");
const app = express();
const {auth} = require('./../middlewares/auth');

const authRouter = require("./AuthRouter");
const userRouter = require("./UserRouter");
const fileRouter = require("./FileRouter");

// middlewares
app.use("/user", auth);
app.use("/file", auth);

// routers
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);

module.exports = app;
