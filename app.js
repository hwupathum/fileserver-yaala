const express = require("express");
const mongoose = require("mongoose");
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const db = require("./src/config/config");
const app = express();

const router = require("./src/routers");

// body parser
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());


// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", router);

// connect to DB
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true}
  ).then(() => {
  console.log("connected to DB");
});

app.listen(3000, () => {
  console.log("listening to 3000")
});
