const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  tasks_ToDo: { type: Array, required: true },
  tasks_Done: { type: Array, required: true },
  tasks_Doing: { type: Array, required: true }
});
module.exports = Project = mongoose.model("projects", ProjectSchema);