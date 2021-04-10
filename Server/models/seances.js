const mongoose = require("mongoose");

var seancesSchema = new mongoose.Schema({
  idClasses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
  },
  name: {
    type: String,
  },
  dateCreation: {
    type: Date,
    min: "1987-09-28",
  },
});

const seances = mongoose.model("seances", seancesSchema, "seances");
module.exports = seances;
