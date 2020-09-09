require('dotenv').config();
const express = require("express");
const { json, urlencoded } = require('body-parser')
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const morgan = require('morgan');

//Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(urlencoded({ extended: true }));
    app.use(morgan('dev'));

    app.use("/api", routes);

    app.listen(7777, () => {
      console.log("Server listening at port 7777!")
    })
  })
