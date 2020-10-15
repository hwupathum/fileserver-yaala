const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const OpenApiValidator = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const db = require("./src/config/config");
const app = express();

const router = require("./src/routers");

app.use(cors({ origin: 'http://localhost:5000' , credentials :  true}));

// body parser
app.use(bodyParser.urlencoded({extended : false,limit: '50mb'}));
app.use(bodyParser.text({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(cookieParser());

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    ignorePaths: /^\/api-docs/,
    validateRequests: true, // (default)
    // validateResponses: true, // false by default
  }),
);

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || "500").json({
    message: err.message,
    errors: err.errors,
  });
});

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
