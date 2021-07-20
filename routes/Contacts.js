const express = require('express');
const router = express.Router();
const Quote = require('../models/Contacts');
const verify = require('../verifytoken');

//Get all routes
router.get('/', verify, async (req, res) => {
  const quotes = await Quote.find();

  res.json(quotes);
});

//Create new quote
router.post('/new', verify, async (req, res) => {
  const newQuote = new Quote(req.body);

  const savedQuote = await newQuote.save();

  res.json(savedQuote);
});

//Get  specific Contacts
router.get('/get/:id', verify, async (req, res) => {
  const q = await Quote.findById({ _id: req.params.id });
  res.json(q);
});

//Delete Contacts 
router.delete('/delete/:id', verify, async (req, res) => {
  const result = await Quote.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

//Update a Contacts
router.patch('/update/:id', verify, async (req, res) => {
  const patch = await Quote.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json(patch);
});

module.exports = router;