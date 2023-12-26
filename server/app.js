const express = require("express");
const router = require("./routes/index");
const { errorHandler } = require("./middlewares/errorHandler");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

