const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
let classes = require("../models/classes");

// READ (ALL)
router.get("/", (req, res) => {
  classes
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
  classes
    .findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such classes.` });
    });
});

// READ (ONE WITH ID-Group)
router.get("/findByIdGroup/:id", (req, res) => {
  classes
    .find({ idGroup: req.params.id })
    .then((result) => {
      success: true, res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such course.` });
    });
});

// ADD
router.post("/", (req, res) => {
  console.log(req.body);
  let newClass = new classes({
    idProf: 2,
    idGroup: req.body.idGroup,
    name: req.body.name,
    section: req.body.section,
    dateCreation: Date.now(),
  });
  newClass
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          idProf: result.idProf,
          idGroup: result.idGroup,
          name: result.name,
          section: result.section,
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
        if (err.errors.section) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.section.message });
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
  classes
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          idProf: result.idProf,
          idGroup: result.idGroup,
          name: result.name,
          section: result.section,
          dateCreation: result.dateCreation,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

router.put("/:id", (req, res) => {
  let updatedclass = {
    idProf: 2,
    idGroup: req.body.idGroup,
    name: req.body.name,
    section: req.body.section,
    dateCreation: Date.now(),
  };

  classes
    .findOneAndUpdate({ _id: req.params.id }, updatedclass, {
      runValidators: true,
      context: "query",
    })
    .then((oldResult) => {
      classes
        .findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              idProf: newResult.idProf,
              idGroup: newResult.idGroup,
              name: newResult.name,
              section: newResult.section,
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
        if (err.errors.section) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.section.message });
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
