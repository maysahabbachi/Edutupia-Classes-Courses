const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
let courses = require("../models/courses");
let multer = require("multer");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "video/ogg" ||
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/x-matroska" ||
      file.mimetype == "audio/wav" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "audio/mpeg" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/doc" ||
      file.mimetype == "application/msword" ||
      file.mimetype == "application/javascript" ||
      file.mimetype == "application/json" ||
      file.mimetype == "application/vnd.ms-powerpoint" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype == "application/x-rar-compressed" ||
      file.mimetype == "application/xlsx" ||
      file.mimetype == "application/xls"
    ) {
    }
    cb(null, true);
  },
});

// UPLOAD

router.post("/upload", upload.array("files", 6), (req, res, next) => {
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");
  if (req.files) {
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push("http://localhost:5000/public/" + req.files[i].filename);
    }
  }

  res.status(201).json({
    msg: "Done upload!",
    success: true,
    result: {
      reqFiles,
    },
  });
});

// READ (ALL)
router.get("/", (req, res) => {
  courses
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
  courses
    .findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such courses.` });
    });
});

// READ (ONE WITH ID-CLASS)
router.get("/findByIdSeances/:id", (req, res) => {
  courses
    .find({ idSeances: req.params.id })
    .then((result) => {
      success: true, res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such courses.` });
    });
});

// ADD
router.post("/", upload.array("files", 6), (req, res) => {
  console.log(req.body);
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");
  if (req.files) {
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push("http://localhost:5000/public/" + req.files[i].filename);
    }
  }

  let newCourses = new courses({
    idProf: 2,
    idSeances: req.body.idSeances,
    name: req.body.name,
    description: req.body.description,
    dateCreation: Date.now(),
    files: reqFiles,
  });
  newCourses
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          idProf: result.idProf,
          idSeances: result.idSeances,
          name: result.name,
          description: result.description,
          dateCreation: result.dateCreation,
          files: result.files,
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
        if (err.errors.description) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.description.message });
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
  courses
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          idProf: result.idProf,
          idSeances: result.idSeances,
          name: result.name,
          description: result.description,
          dateCreation: result.dateCreation,
          files: result.files,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

router.put("/:id", (req, res) => {
  let updatedCourses = {
    idProf: 2,
    idSeances: req.body.idSeances,
    name: req.body.name,
    description: req.body.description,
    dateCreation: Date.now(),
    files: req.body.files,
  };

  courses
    .findOneAndUpdate({ _id: req.params.id }, updatedCourses, {
      runValidators: true,
      context: "query",
    })
    .then((oldResult) => {
      courses
        .findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              idProf: newResult.idProf,
              idSeances: newResult.idSeances,
              name: newResult.name,
              description: newResult.description,
              dateCreation: newResult.dateCreation,
              files: newResult.files,
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
        if (err.errors.description) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.description.message });
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
