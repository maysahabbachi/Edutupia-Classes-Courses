const mongoose = require("mongoose");

var coursesSchema = new mongoose.Schema({
  idProf: {
    type: Number,
  },
  idSeances: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seances",
  },
  name: {
    type: String,
  },
  dateCreation: {
    type: Date,
    min: "1987-09-28",
  },
  description: {
    type: String,
  },
  files: {
    type: [],
  },
});

const courses = mongoose.model("courses", coursesSchema, "courses");
module.exports = courses;
