const express = require("express");
const app = express();

const userRouter = require("./UserRouter")

// routers
app.use("/user", userRouter)

module.exports = app;