const express = require("express");
const app = express();
const {auth} = require('./../middlewares/auth');

const authRouter = require("./AuthRouter");
const userRouter = require("./UserRouter");

// middlewares
app.use("/user", auth);

// routers
app.use("/auth", authRouter);
app.use("/user", userRouter);

module.exports = app;
