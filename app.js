const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const transactionsController = require("./controllers/transactionsController.js");

app.use(express.json()); //parse incoming data
app.use(cors());

app.use(logger("dev")); //used with morgan package

app.use("/transactions", transactionsController);

app.use((req, res, next) => {
  console.log("This code runs for every request");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the Budgeting App");
})

//404 page
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
})

module.exports = app;
