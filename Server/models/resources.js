const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourcesSchema = new Schema({
  title: { type: String, required: true },
  src: { type: String, required: true },
  type: { type: String, required: true }
});
module.exports = ResourcesSchema = mongoose.model("resources", ResourcesSchema);