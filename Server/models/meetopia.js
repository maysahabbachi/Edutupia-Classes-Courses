const mongoose = require("mongoose");
const Resources = require("./resources").schema
const Schema = mongoose.Schema;

const MeetopiaSchema = new Schema({
  title: { type: String, required: true },
  attendance: { type: Array, required: true },
  startDate: { type: Date, required: true, default: Date.now },
  meetopiaFile: { type: String, required: true },
  chatHistory: { type: string, required: true },
  resources: [Resources]
});
module.exports = Meetopia = mongoose.model("meetopias", MeetopiasSchema);