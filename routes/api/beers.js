const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Beer model
const Beer = require("../../models/Beer");
// Profile model (needed to check whose beer has been posted)
const User = require("../../models/User");

// @route   GET api/beers/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Beers works"
  })
);

// @route   GET api/beers/all
// @desc    Get all listed beers
// @access  Public

router.get("/all", (req, res) => {
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
// @desc    Get beer by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  Beer.findOne({
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
// @desc    Create or edit beers
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //  Check validation
    if (!isValid) {
      //  Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const beerFields = {}; // beerFields get filled
    beerFields.user = req.user.id;
    if (req.body.handle) beerFields.handle = req.body.handle;
    if (req.body.info) beerFields.info = req.body.info;
    if (req.body.comment) beerFields.comment = req.body.comment;
    if (req.body.location) beerFields.location = req.body.location;
    if (req.body.date) beerFields.date = req.body.date;
    //  Favorites - Split into array
    //   if (typeof req.body.favorites !== "undefined") {
    //     beerFields.favorites = req.body.favorites.split(",");
    //   }
    Beer.findOne({
      user: req.user.id
    }).then(beer => {
      if (beer) {
        // Update beer
        Beer.findOneAndUpdate(
          { user: req.user.id },
          { $set: beerFields },
          { new: true }
        ).then(beer => res.json(beer));
      } else {
        // Create
        // Check if handle exists (the profile)
        Beer.findOne({
          handle: beerFields.handle
        }).then(beer => {
          if (beer) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          // Save beer
          new Beer(beerFields).save().then(beer => res.json(beer));
        });
      }
    });
  }
);

// @route   DELETE api/beer
// @desc    Delete beer
// @access  Private

router.delete(
  "/",
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
