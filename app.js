const express = require("express");
const app = express();
const mongoose = require("mongoose");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
const router = require("./src/routers");

// body parser
app.use(express.json());

// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", router);

// connect to DB
mongoose.connect(
  "mongodb://localhost:27017/mediaserver", 
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
  console.log("connected to DB")
});

app.listen(3000, () => {
  console.log("listening to 3000")
})