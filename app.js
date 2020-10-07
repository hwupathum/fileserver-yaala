const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
const router = require("./src/routers");

// middlewares
// body parser
app.use(express.json());

// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", router);

app.listen(3000, () => {
  console.log("listening to 3000")
})