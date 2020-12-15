const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
  })
);
//Help page
router.get("/help", (req, res) => {
  res.render("help");
});
//Visualization page
router.get("/senu", ensureAuthenticated, (req, res) => {
  axios
    .get("http://localhost:5000/uptime")
    .then(function (data) {
      res.render("vis", {
        time: data.data.Latest,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//Data entry page
router.get("/entry", ensureAuthenticated, (req, res) => {
  res.render("record", {
    user: req.user,
  });
});
router.post("/entry", ensureAuthenticated, (req, res) => {
  var new_body = {
    name: req.body.name,
    type: req.body.type,
    admitted: req.body.admitted,
    doctors: req.body.doctors,
    nurses: req.body.nurses,
    time: Date(),
  };

  axios
    .post("http://localhost:5000", new_body)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("record", {
    user: req.user,
  });
});

module.exports = router;
