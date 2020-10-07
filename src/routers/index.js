const express = require("express");
const app = express();

const authRouter = require("./AuthRouter")
const userRouter = require("./UserRouter")

// middlewares
app.use("/user", () => {
  console.log(
    "middleware for auth"
  )
})

// routers
app.use("/auth", authRouter)
app.use("/user", userRouter)

module.exports = app;