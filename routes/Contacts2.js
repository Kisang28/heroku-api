const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

var { Users } = require('../models/Contacts2.js');


// signup route api
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
  
    let user = await Users.findOne({ email });

    if (user) {
      return res.json({ msg: "Email already taken" });
    }
  
    user = new Users({
      email,
      password,
    });
  
    await user.save();
    var token = jwt.sign({ id: user.id }, "password");
    res.json({ token: token });
  });

  // login route api
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
  
    let user = await Users.findOne({ email });
    console.log(user);

    if (!user) {
      return res.json({ msg: "no user found with that email" });
    }
    if (user.password !== password) {
      return res.json({ msg: "password is not correct" });
    }
  
    var token = jwt.sign({ id: user.id }, "password");
    return res.json({ token: token });
  });

  module.exports =router;