const mongoose = require("mongoose");

var classesGroupSchema = new mongoose.Schema({
  idOwner: {
    type: String,
  },
  name: {
    type: String,
  },
  dateCreation: {
    type: Date,
    min: "1987-09-28",
  },
});

const classesGroup = mongoose.model(
  "classesGroup",
  classesGroupSchema,
  "classesGroup"
);
module.exports = classesGroup;
