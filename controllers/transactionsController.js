const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transaction.js");
const { validateURL } = require("../models/validations.js");

// Get, all the entries in the database
transactions.get("/", (req, res) => {
  res.json(transactionsArray)
})

// SHOW
transactions.get("/:arrayIndex", (req, res) => {
  if (transactionsArray[req.params.arrayIndex]) {
    res.json(transactionsArray[req.params.arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// CREATE
transactions.post("/", validateURL, (req, res) => {
  transactionsArray.push(req.body);
  res.json(transactionsArray[transactionsArray.length - 1]);
});


// DELETE
transactions.delete("/:indexArray", (req, res) => {
  const deletedTransaction = transactionsArray.splice(req.params.indexArray, 1);
  res.status(200).json(deletedTransaction);
});

// UPDATE
transactions.put("/:arrayIndex", validateURL, async (req, res) => {
  if (transactionsArray[req.params.arrayIndex]) {
    transactionsArray[req.params.arrayIndex] = req.body;
    console.log("PUT route successful", req.body )
    res.status(200).json(transactionsArray[req.params.arrayIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = transactions;