const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
let seances = require("../models/seances");

// READ (ALL)
router.get("/", (req, res) => {
  seances
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// READ (ONE)
router.get("/:id", (req, res) => {
  seances
    .findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such seances.` });
    });
});
// READ (ONE WITH ID-CLASS)
router.get("/findByIdClasses/:id", (req, res) => {
  seances
    .find({ idClasses: req.params.id })
    .then((result) => {
      success: true, res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such seance.` });
    });
});

// ADD
router.post("/", (req, res) => {
  let newSeance = new seances({
    idClasses: req.body.idClasses,
    name: req.body.name,
    dateCreation: Date.now(),
  });
  newSeance
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          idClasses: result.idClasses,
          name: result.name,
          dateCreation: result.dateCreation,
        },
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.dateCreation) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.dateCreation.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  seances
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          idClasses: result.idClasses,
          name: result.name,
          dateCreation: result.dateCreation,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

router.put("/:id", (req, res) => {
  let updatedSeances = {
    idClasses: req.body.idClasses,
    name: req.body.name,
    dateCreation: Date.now(),
  };

  seances
    .findOneAndUpdate({ _id: req.params.id }, updatedSeances, {
      runValidators: true,
      context: "query",
    })
    .then((oldResult) => {
      seances
        .findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              idClasses: newResult.idClasses,
              name: newResult.name,
              dateCreation: newResult.dateCreation,
            },
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.name.message });
          return;
        }

        if (err.errors.dateCreation) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.dateCreation.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

module.exports = router;
