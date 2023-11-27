var express = require("express");
var router = express.Router();
var User = require("../models/User");
var bcrypt = require("bcrypt");
var moment = require("moment");
var bodyParser = require("body-parser");

// Body-Parser
var jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  res.send("Register Here");
});

router.post("/", jsonParser, async (req, res) => {
  // Hash Password
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    mobile: req.body.mobile,
    gender: req.body.gender,
  };

  let newUser = new User(user);

  newUser.save((err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Only send this response after the user is successfully saved
      res.status(201).json(result);
    }
  });

  // Move this line outside the callback to avoid the "headers already sent" error
  // res.send("Registration successful");
});

module.exports = router;
