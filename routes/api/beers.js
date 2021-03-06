const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Beer model
const Beer = require("../../models/Beer");
// Profile model (needed to check whose beer has been posted)
const User = require("../../models/User");

// Validation
const validateBeersInput = require("../../validation/beers");

// @route   GET api/beers/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Beers works"
  })
);

// @route   GET api/beers/
// @desc    Get all listed beers
// @access  Public

router.get("/", (req, res) => {
  const errors = {};
  Beer.find()
    .populate("user", ["name", "avatar"])
    .then(beers => {
      if (!beers) {
        errors.nobeer = "There are no beers";
        return res.status(404).json(errors);
      }
      res.json(beers); //-- beers
    })
    .catch(err => res.status(404).json("There are no beers"));
});

// @route   GET api/beers/handle/:handle
// @desc    Get beer by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Beer.findOne({
    handle: req.params.handle
  })
    .populate("user", ["name", "avatar"])
    .then(beer => {
      if (!beer) {
        errors.nobeer = "There is no beer for this user";
        res.status(404).json(errors);
      }
      res.json(beer);
    })
    .catch(err => res.status(404).json("There is no beer for this user"));
});

// @route   GET api/beer/user/:user_id
// @desc    Get beers by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  Beer.find({
    user: req.params.user_id
  })
    .populate("user", ["name", "avatar"])
    .then(beer => {
      if (!beer) {
        errors.nobeer = "There is no beer for this user";
        res.status(404).json(errors);
      }
      res.json(beer);
    })
    .catch(err => res.status(404).json("There is no beer for this user"));
});

// @route   POST api/beers
// @desc    Create beers
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateBeersInput(req.body);

    // Check Validaiton
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newBeer = new Beer({
      handle: req.body.handle,
      name: req.body.name,
      alc: req.body.alc,
      user: req.user.id,
      origin: req.body.origin,
      price: req.body.price,
      description: req.body.description
    });

    newBeer.save().then(beer => res.json(beer));
    //  save
  }
);

// @route   PUT api/beers
// @desc    update existing beer
// @access  Private

router.put(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateBeersInput(req.body);

    // Check Validaiton
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newBeer = new Beer({
      handle: req.body.handle,
      name: req.body.name,
      alc: req.body.alc,
      user: req.user.id,
      origin: req.body.origin,
      price: req.body.price,
      description: req.body.description
    });

    newBeer.save().then(beer => res.json(beer));
    //  save
  }
);

// @route   DELETE api/beers
// @desc    Delete beer
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Beer.findOneAndRemove({
      user: req.user.id
    }).then(() =>
      res.json({
        success: true
      })
    );
  }
);

module.exports = router;
