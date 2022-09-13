const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//create express server
const app = express();
const port = process.env.PORT || 5000;

//middleware
//cors allow ajax request to skip the same origin policy and access resuirces from remote hosts
//body parser extracts the entire body portion of te incoming req and exposes on req.body
app.use(cors());
app.use(express.json()); //parse

//mongodb cta connect bhayo
//uri from mongodb atlas ko db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully"); //in terminal
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
