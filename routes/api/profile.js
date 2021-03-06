const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateBeersProfileInput = require("../../validation/beersprofile");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile works"
  })
);

// @route   GET api/profile
// @desc    User current Users Profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles); //-- profiles, NOT profile
    })
    .catch(err => res.status(404).json("There are no profiles"));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({
    handle: req.params.handle
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json("There is no profile for this user"));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  Profile.findOne({
    user: req.params.user_id
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json("There is no profile for this user"));
});

// @route   POST api/profile
// @desc    Create or edit User profile
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
    const profileFields = {}; // profileFields get filled
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.info) profileFields.info = req.body.info;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.date) profileFields.date = req.body.date;
    //  Favorites - Split into array
    if (typeof req.body.favorites === "string") {
      profileFields.favorites = req.body.favorites.split(",");
    }
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        // Update Profile
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        ).then(profile => res.json(profile));
      } else {
        // Create
        // Check if handle exists (the profile)
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/beers
// @desc    Add beers to profile
// @access  Private
router.post(
  "/beersprofile",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateBeersProfileInput(req.body);

    //  Check validation
    if (!isValid) {
      //  Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      const newBeer = {
        name: req.body.name,
        alc: req.body.alc,
        origin: req.body.origin,
        price: req.body.price,
        description: req.body.description
      };
      // Add to beer array (from model)
      profile.beer.unshift(newBeer);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/beers/:beer_id
// @desc    Delete beers from profile
// @access  Private
router.delete(
  "/beers/:beer_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.beer
          .map(item => item.id)
          .indexOf(req.params.beer_id);

        // Splice out of array
        profile.beer.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete profile
// @access  Private

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOneAndRemove({
      user: req.user.id
    }).then(() =>
      res.json({
        success: true
      })
    );
  }
);

module.exports = router;
