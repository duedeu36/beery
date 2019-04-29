const express = require("express");
const router = express.Router();
const fs = require("fs");

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Notes works"
  })
);

// @route   GET api/notes
// @desc    Read all notes
// @access  Public
router.get("/", (req, res) => {
  fs.readFile("./notes.json", "utf-8", function getPosts() {
    return new Promise((resolve, reject) => {
      if (posts.length === 0) {
        reject({
          message: "no posts available",
          status: 202
        });
      }
      resolve(posts);
    });
  });
});

// @route   POST api/notes/add
// @desc    Write notes route
// @access  Public
router.post("/add", (req, res) => {
  arrayOfNotes.notes.push({
    task1: "muuh",
    task2: "kuuh"
  });

  fs.writeFile("./notes.json", JSON.stringify(arrayOfNotes), "utf-8", function(
    err,
    data
  ) {
    var arrayOfNotes = JSON.parse(data);
    if (err) throw err;
    console.log("Done!");
  });
});

// @route   PUT api/notes/edit
// @desc    Update note route
// @access  Public
router.put("/edit:id", (req, res) => {});

// @route   DELETE api/notes/delete
// @desc    Delete note route
// @access  Public
router.post("/delete:id", (req, res) => {});

module.exports = router;
