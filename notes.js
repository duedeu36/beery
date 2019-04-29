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
router.post("/add", function(req, res) {
  if (!req.body.todo && !req.body.status)
    return res.status(400).send({ error: "todo and status required" });

  // if(!Array.isArray(req.body.todo && req.body.status)) {
  //     return res.send({ error: 'todo and status not a proper array' });
  // }

  fs.readFile(__dirname + "/notes.json", function(err, data) {
    if (err) return res.send({ error: err });

    var notes = null;
    try {
      notes = JSON.parse(data);
    } catch (e) {
      return res.send({ error: e.toString() });
    }

    //  if(!Array.isArray(req.body.productids)) {
    //      return res.send({ error: 'orders json is invalid/ not a proper array' });
    //  }

    //  newOrderId = randomstring.generate(20);
    let newNote = {
      todo: req.body.todo,
      status: req.body.status
      //   date: new Date().toLocaleString()
    };

    notes.push(newNote);

    let strOrders = null;
    try {
      strOrders = JSON.stringify(orders);
    } catch (e) {
      return res.send({ error: e });
    }

    fs.writeFile(__dirname + "/notes.json", strOrders, function(err) {
      if (err) return res.send({ error: err });

      return res.send({ error: 0, orders: orders });
    });
  });
});

module.exports = router;
